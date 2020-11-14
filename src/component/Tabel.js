import React, { useContext, useEffect } from "react";
import { ProdukContext } from "../context/ProdukContext";
import axios from "axios";

const Tabel = () => {
  const [produkList, setProdukList] = useContext(ProdukContext);

  //Get Data
  useEffect(() => {
    if (produkList.lists === null) {
      axios
        .get(`http://127.0.0.1:8000/api/products`, {
          method: "get",
        })
        .then((res) => {
          console.log(res);
          setProdukList({
            ...produkList,
            lists: res.data.map((el) => {
              return {
                id: el.id,
                nama_produk: el.nama_produk,
                keterangan: el.keterangan,
                jumlah: el.jumlah,
                harga: el.harga,
              };
            }),
          });
        });
    }
  }, [produkList, setProdukList]);

  //Edit Button Function
  const handleEdit = (event) => {
    let idProduk = parseInt(event.target.value);

    setProdukList({
      ...produkList,
      selectedId: idProduk,
      statusForm: "changeToEdit",
    });
    console.log(idProduk);
  };

  //Delete Button Function
  const handleDelete = (event) => {
    let idProduk = parseInt(event.target.value);
    console.log(idProduk);

    let newLists = produkList.lists.filter((el) => el.id !== idProduk);

    axios
      .delete(`http://127.0.0.1:8000/api/product/${idProduk}`)
      .then((res) => {
        console.log(res);
        alert("Data Berhasil Dihapus");
      });

    setProdukList({ ...produkList, lists: [...newLists] });
  };

  return (
    <>
      <div className="container">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Produk</th>
                <th>Keterangan</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {produkList.lists !== null &&
                produkList.lists.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.nama_produk}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.jumlah}</td>
                      <td>{item.harga}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          style={{ margin: 5 }}
                          onClick={handleEdit}
                          value={item.id}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleDelete}
                          value={item.id}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tabel;
