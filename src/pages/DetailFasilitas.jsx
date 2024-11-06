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
            <button 
              className="btn btn-danger" 
              data-bs-toggle="modal" 
              data-bs-target="#formModal"
            >
              Booking
            </button>
          </div>
        </div>
      </div>

      {/* Modal Form Peminjaman */}
      <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-medium text-center" id="formModalLabel">Formulir Peminjaman</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="text-center">Ajukan peminjaman fasilitas dengan mengisi formulir berikut secara lengkap</p>
              
              <form>
                <div className="mb-3">
                  <label className="form-label">Nama Organisasi</label>
                  <input type="text" className="form-control" placeholder="Nama Organisisi"/>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Tanggal Peminjaman</label>
                    <input type="date" className="form-control"/>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Jam Peminjaman</label>
                    <div className="row">
                      <div className="col-5">
                        <input 
                          type="time" 
                          className="form-control" 
                          placeholder="Jam Mulai"
                        />
                      </div>
                      <div className="col-2 text-center d-flex align-items-center justify-content-center">
                        <span>-</span>
                      </div>
                      <div className="col-5">
                        <input 
                          type="time" 
                          className="form-control" 
                          placeholder="Jam Selesai"
                        />
                      </div>
                    </div>
                    <small className="text-muted">Format: 24 jam (WITA)</small>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nama Penanggung Jawab</label>
                    <input type="text" className="form-control" placeholder="Nama Lengkap"/>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Kontak Penanggung Jawab</label>
                    <input type="text" className="form-control" placeholder="08123456789"/>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Keperluan Peminjaman</label>
                  <input type="text" className="form-control" placeholder="seminar"/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="organisasi@gmail.com"/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Surat Peminjaman</label>
                  <div className="input-group">
                    <input 
                      type="file" 
                      className="form-control" 
                      id="uploadSurat"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                  <small className="text-muted">Format file: PDF</small>
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agreement"/>
                  <label className="form-check-label" htmlFor="agreement">
                    Saya menyetujui syarat dan ketentuan peminjaman fasilitas ini, termasuk bertanggung jawab atas kerusakan, kebersihan, dan pengembalian fasilitas dalam kondisi baik setelah digunakan
                  </label>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-danger">Booking</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL FASILITAS */}
    <div className="container my-2">
         <h2 className="fw-bold fs-2 text-center py-5">DETAIL FASILITAS</h2>

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
