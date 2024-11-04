export const DetailFasilitas = () => {
  return (
    <div>
        {/* HEADER DETAIL FASILITAS */}
      <div className="row">
        <div className="fixed-size position-relative">
          <img
            src="https://sippn.menpan.go.id/images/article/large/fakultas-mipa-750x375-1-20240905105353.jpeg"
            alt="Fakultas MIPA"
            className="detail-image"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center text-dark">
            <h1 className="fw-bold mb-3">SCIENCE BUILDING</h1>
            <button className="btn btn-primary">Booking</button>
          </div>
        </div>
      </div>

      {/* DETAIL FASILITAS */}
    <div className="container my-2">
         <h2 className="fw-medium fs-2 text-center py-5">DETAIL FASILITAS</h2>

        <div className="row">
            <div className="col-6">
                <img src="https://sci.unhas.ac.id/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-22-at-12.59.05-1024x771.jpeg" alt="" className="img-fluid" />
            </div>

            <div className="col-5 offset-1">
                <p className="fw-semibold">Ruangan ini telah di booking pada:</p>

                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">TANGGAL PINJAM</th>
                        <th scope="col">JAM MULAI</th>
                        <th scope="col">JAM AKHIR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01-01-2024</td>
                        <td>07 : 00</td>
                        <td>08 : 00</td>
                    </tr>
                    <tr>
                        <td>02-01-2024</td>
                        <td>07 : 00</td>
                        <td>08 : 00</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div className="row py-3">
            <div className="col-2">
                <img src="https://sci.unhas.ac.id/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-22-at-12.59.05-1024x771.jpeg" alt="" className="img-fluid" />
            </div>
            <div className="col-2">
                <img src="https://sci.unhas.ac.id/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-22-at-12.59.05-1024x771.jpeg" alt="" className="img-fluid" />
            </div>
            <div className="col-2">
                <img src="https://sci.unhas.ac.id/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-22-at-12.59.05-1024x771.jpeg" alt="" className="img-fluid" />
            </div>
        </div>


        {/* TABLE */}
        
        <div className="row">
          <div className="col-6">

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Gedung</th>
                  <th scope="col">Lantai</th>
                  <th scope="col">Kapasitas</th>
                </tr>
              </thead>
              <tbody className="">
                <tr>
                  <td>Scence Building</td>
                  <td>1</td>
                  <td>150 orang</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

    </div>



    </div>
  )
}
