import React from "react";
import { ProdukProvider } from "../context/ProdukContext";
import TabelProduk from "../component/Tabel";
import FormProduk from "../component/From";
export default function Produk() {
  return (
    <div>
      <ProdukProvider>
        <div className="containe text-center mt-3 mb-5">
          <h1>Daftar Produk</h1>
        </div>
        <TabelProduk />
        <FormProduk />
      </ProdukProvider>
    </div>
  );
}
