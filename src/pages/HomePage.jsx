import { Link } from 'react-router-dom';

export const HomePage = () => {



  return (
    <div>
          <div className="welcome-text position-absolute top-50 start-50 translate-middle text-center text-dark">
            <p>SELAMAT DATANG DI PENTAS</p>
            <h1 className='fw-bold'>WEBSITE PEMINJAMAN FASILITAS FMIPA UNHAS</h1>
          </div>
        {/* CARAUSEL */}
                <div id="carouselExampleIndicators" className="carousel slide fixed-size-carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img
                        src="https://sippn.menpan.go.id/images/article/large/fakultas-mipa-750x375-1-20240905105353.jpeg"
                        className="d-block w-100 carousel-image"
                        alt="..."
                    />
                    </div>
                    <div className="carousel-item">
                    <img src="https://identitasunhas.com/wp-content/uploads/2019/08/WhatsApp-Image-2019-08-09-at-21.34.55.jpeg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                    <img src="https://sci.unhas.ac.id/wp-content/uploads/2023/12/foto-1024x489.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>     

        {/* FASILITAS */}
            <div className="fasilitas container-fluid">
                <div className="container">
                    
                    <h2 className="text-center py-5 fw-semibold">
                    FASILITAS
                    </h2>

                    {/* CARD */}
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
                        {[1, 2, 3].map((index) => (
                          <div className="col" key={index}>
                            <div className="card h-100">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR652IUoH2ZkNXQaEpnhs46v-pWMzf0GZD9rg&s" className="card-img-top" alt="..." />
                              <div className="card-body">
                                <h5 className="card-title fw-medium">Nama Gedung</h5>
                                <p className="card-text">00 : 00 - 00 : 00 AM.</p>
                                <Link to="/detail-fasilitas" className="btn btn-danger">Lihat Detail</Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center mt-4">
                        {[1, 2, 3].map((index) => (
                          <div className="col" key={index}>
                            <div className="card h-100">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR652IUoH2ZkNXQaEpnhs46v-pWMzf0GZD9rg&s" className="card-img-top" alt="..." />
                              <div className="card-body">
                                <h5 className="card-title">Nama Gedung</h5>
                                <p className="card-text">00 : 00 - 00 : 00 AM.</p>
                                <Link to="/detail-fasilitas" className="btn btn-danger">Lihat Detail</Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
                
            </div>

    </div>
  )
}
