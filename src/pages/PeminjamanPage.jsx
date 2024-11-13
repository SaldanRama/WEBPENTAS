import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import id from 'date-fns/locale/id'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './PeminjamanPage.css'

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
      start: new Date(2024, 10, 15),
      end: new Date(2024, 10, 15),
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
    alert(`
      Fasilitas: ${event.resource}
      Acara: ${event.title}
      Tanggal: ${format(event.start, 'dd MMMM yyyy', { locale: id })}
      Keterangan: ${event.desc}
    `)
  }

  return (
    <div className="peminjaman-container">
      <div className="calendar-card">
        <div className="calendar-header">
          <h2>Jadwal Peminjaman Fasilitas</h2>
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
