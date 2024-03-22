import { useState } from "react";
import { CalendarItemType as CalendarItemType } from "../calendar/calendarItemInterface"
import supabase from "../../config/supabaseClient";
import styled from "styled-components";

const PopUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background: #fff;
  z-index: 10;
`

const EditForm = styled.div`
display: flex;
flex-direction: row;
`

const EditCalendarItem = ({ id, date, name, description, venue, location, setOpenEdit }: CalendarItemType | any) => {
  const [calendarItem, setCalendarItem] = useState<CalendarItemType>({ ...{ date, name, description, venue, location } })
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCalendarItem({ ...calendarItem, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate date (greater than today)
    if (new Date(calendarItem.date) <= new Date()) {
      alert("Please select a date in the future.");
      return;
    }

    // Show confirmation popup
    setShowConfirmationPopup(true);
  };

  const handleConfirmation = async (confirmed: boolean) => {
    setShowConfirmationPopup(false);

    if (confirmed) {
      // Send data to the database (replace with your actual logic)
      const { error } = await supabase
        .from('calendar')
        .update({ ...calendarItem })
        .eq('id', id)

      console.log(error) // handle error
      setOpenEdit(false)
    }
  };


  return (
    <>{showConfirmationPopup && (
      <PopUp>
        <p>Send to database?</p>
        <button onClick={() => handleConfirmation(true)}>Sim</button>
        <button onClick={() => handleConfirmation(false)}>Não</button>
      </PopUp>
    )}
      <EditForm style={{ position: 'relative' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={calendarItem.date.toString()}
            onChange={handleChange}
            required // Mark as required
          />
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={calendarItem.description} onChange={handleChange} />

          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={calendarItem.name} onChange={handleChange} required />

          <label htmlFor="venue">Nome do lugar:</label>
          <input type="text" id="venue" name="venue" value={calendarItem.venue} onChange={handleChange} required />

          <label htmlFor="location">Localização:</label>
          <input type="text" id="location" name="location" value={calendarItem.location} onChange={handleChange} required />

          <button type="submit">Enviar</button>
        </form>
      </EditForm>
    </>
  )
}

export default EditCalendarItem

