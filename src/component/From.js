import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ProdukContext } from "../context/ProdukContext";

const ProdukForm = () => {
  let inputProduk = {
    nama_produk: "",
    keterangan: "",
    jumlah: 0,
    harga: 0,
  };
  const [produkList, setProdukList] = useContext(ProdukContext);
  const [input, setInput] = useState(inputProduk);

  //Get Data For Edit
  useEffect(() => {
    if (produkList.statusForm === "changeToEdit") {
      let dataProduk = produkList.lists.find(
        (el) => el.id === produkList.selectedId
      );
      setInput({
        id: dataProduk.id,
        nama_produk: dataProduk.nama_produk,
        keterangan: dataProduk.keterangan,
        jumlah: dataProduk.jumlah,
        harga: dataProduk.jumlah,
      });
      setProdukList({ ...produkList, statusForm: "edit" });
    }
  }, [produkList, setProdukList]);

  //Handel Change From
  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "nama_produk": {
        setInput({ ...input, nama_produk: event.target.value });
        break;
      }
      case "keterangan": {
        setInput({ ...input, keterangan: event.target.value });
        break;
      }
      case "jumlah": {
        setInput({ ...input, jumlah: event.target.value });
        break;
      }
      case "harga": {
        setInput({ ...input, harga: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  //Handel Submit Proses
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    if (produkList.statusForm === "create") {
      axios
        .post(`https://dry-beach-47108.herokuapp.com/api/product`, {
          nama_produk: input.nama_produk,
          keterangan: input.keterangan,
          jumlah: input.jumlah,
          harga: input.jumlah,
        })
        .then((res) => {
          setProdukList({
            statusForm: "create",
            selectedId: 0,
            lists: [
              ...produkList.lists,
              {
                id: res.data.id,
                nama_produk: input.nama_produk,
                keterangan: input.keterangan,
                jumlah: input.jumlah,
                harga: input.harga,
              },
            ],
          });
          alert("Produk Berhasil Ditambahkan!");
        });
    } else if (produkList.statusForm === "edit") {
      axios
        .put(
          `https://dry-beach-47108.herokuapp.com/api/product/${produkList.selectedId}`,
          input
        )
        .then(() => {
          let dataProduk = produkList.lists.find(
            (el) => el.id === produkList.selectedId
          );
          dataProduk.nama_produk = input.nama_produk;
          dataProduk.keterangan = input.keterangan;
          dataProduk.jumlah = input.jumlah;
          dataProduk.harga = input.harga;
          setProdukList({
            statusForm: "create",
            selectedId: 0,
            lists: [...produkList.lists],
          });
          alert("Produk Berhasil diUbah!");
        });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="h3">Form Produk</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label for="nama_produk" className="col-sm-2 col-form-label">
              Nama Produk
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="nama_produk"
                value={input.nama_produk}
                onChange={handleChange}
                placeholder="Masukan Nama Produk"
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="nama_produk" className="col-sm-2 col-form-label">
              Keterangan
            </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                name="keterangan"
                onChange={handleChange}
                value={input.keterangan}
                placeholder="Masukan Keterangan"
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="nama_produk" className="col-sm-2 col-form-label">
              Jumlah
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="jumlah"
                value={input.jumlah}
              />
            </div>
          </div>

          <div className="form-group row">
            <label for="nama_produk" className="col-sm-2 col-form-label">
              Harga
            </label>
            <div className="col-sm-10">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Rp</div>
                </div>

                <input
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                  name="harga"
                  value={input.harga}
                />
              </div>
            </div>
          </div>
          <div className="form-group row justify-content-end">
            <div className="col-sm-10 ">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block "
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ProdukForm;
