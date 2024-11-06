import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const NotificationComponents = () => {
  const notifications = [
    {
      id: 1,
      ruangan: "Aula Fakultas",
      tanggal: "2024-03-20",
      status: "disetujui",
      pesan: "Peminjaman ruangan telah disetujui"
    },
    {
      id: 2, 
      ruangan: "Lab Komputer",
      tanggal: "2024-03-21",
      status: "diproses",
      pesan: "Peminjaman sedang dalam proses review"
    },
    {
      id: 3,
      ruangan: "Ruang Meeting",
      tanggal: "2024-03-22",
      status: "ditolak",
      pesan: "Peminjaman ditolak karena jadwal bentrok"
    }
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'disetujui':
        return {
          icon: <FaCheckCircle size={20} />,
          className: 'alert alert-success',
          textColor: 'text-success'
        };
      case 'diproses':
        return {
          icon: <FaClock size={20} />,
          className: 'alert alert-warning',
          textColor: 'text-warning'
        };
      case 'ditolak':
        return {
          icon: <FaTimesCircle size={20} />,
          className: 'alert alert-danger',
          textColor: 'text-danger'
        };
      default:
        return {
          icon: <FaClock size={20} />,
          className: 'alert alert-secondary',
          textColor: 'text-secondary'
        };
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4 fw-medium">Status Peminjaman</h4>
      <div className="notifications">
        {notifications.map((notif) => {
          const statusStyle = getStatusStyle(notif.status);
          return (
            <div key={notif.id} className={`${statusStyle.className} d-flex align-items-center mb-3`} role="alert">
              <div className="d-flex align-items-center flex-grow-1">
                <div className={`me-3 ${statusStyle.textColor}`}>
                  {statusStyle.icon}
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Peminjaman {notif.ruangan}</h6>
                  <p className="mb-1">{notif.pesan}</p>
                  <small className="text-muted">
                    <i className="far fa-calendar me-1"></i>
                    Tanggal: {notif.tanggal}
                  </small>
                </div>
              </div>
              <span className={`badge ${statusStyle.textColor} ms-auto text-capitalize`}>
                {notif.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationComponents; 