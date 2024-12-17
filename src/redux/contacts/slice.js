import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { selectContacts } from "./selectors";
import { selectNameFilter } from "../filters/selectors";
import { logOut } from "../auth/operations"; // Імпортуємо logOut

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      // Додаємо очистку контактів при logout
      .addCase(logOut.fulfilled, (state) => {
        state.contacts.items = []; // Очищаємо список контактів
        state.contacts.error = null; // Очищаємо помилки
        state.contacts.loading = false; // Зупиняємо індикатор завантаження
      })
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending
        ),
        (state) => {
          state.contacts.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          fetchContacts.rejected
        ),
        (state) => {
          state.contacts.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled
        ),
        (state) => {
          state.contacts.loading = false;
        }
      );
  },
});

export default slice.reducer;

// Важливо: не експортуйте селектори безпосередньо. Використовуйте їх через загальний експорт, якщо це потрібно.
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((item) => item.name.toLowerCase().includes(filter));
  }
);
