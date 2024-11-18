import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import id from 'date-fns/locale/id'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './PeminjamanPage.css'
import { Modal } from 'bootstrap'

const locales = {
  'id': id,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Update eventStyleGetter tanpa parameter yang tidak digunakan
const eventStyleGetter = () => {
  let style = {
    backgroundColor: '#8C1A11',
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: '0px',
    display: 'block',
    fontWeight: 'bold'
  }

  return {
    style
  }
}

export const PeminjamanPage = () => {
  const events = [
    {
      title: 'Peminjaman Aula',
      start: new Date(2024, 10, 18),
      end: new Date(2024, 10, 18),
      resource: 'Aula',
      desc: 'Acara Wisuda'
    },
    {
      title: 'Peminjaman Lab Komputer',
      start: new Date(2024, 10, 20),
      end: new Date(2024, 10, 21),
      resource: 'Lab Komputer',
      desc: 'Ujian Online'
    },
    {
      title: 'Peminjaman Ruang Kelas',
      start: new Date(2024, 10, 25),
      end: new Date(2024, 10, 25),
      resource: 'Ruang Kelas',
      desc: 'Seminar'
    }
  ]

  const handleSelectEvent = (event) => {
    const modalContent = `
      <div class="modal fade" id="eventModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detail Peminjaman</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <strong>Fasilitas:</strong> ${event.resource}
              </div>
              <div class="mb-3">
                <strong>Acara:</strong> ${event.title}
              </div>
              <div class="mb-3">
                <strong>Tanggal:</strong> ${format(event.start, 'dd MMMM yyyy', { locale: id })}
              </div>
              <div class="mb-3">
                <strong>Keterangan:</strong> ${event.desc}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    `

    const oldModal = document.getElementById('eventModal')
    if (oldModal) {
      oldModal.remove()
    }

    document.body.insertAdjacentHTML('beforeend', modalContent)

    const modal = new Modal(document.getElementById('eventModal'))
    modal.show()
  }

  return (
    <div className="peminjaman-container">
      <div className="calendar-card">
        <div className="calendar-header">
          <h2>Jadwal Peminjaman</h2>
        </div>
        <div className="calendar-body">
          <div style={{ height: '75vh' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              views={['month']}
              defaultView='month'
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              messages={{
                next: "Selanjutnya",
                previous: "Sebelumnya",
                today: "Hari Ini",
                month: "Bulan",
                noEventsInRange: "Tidak ada peminjaman",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
