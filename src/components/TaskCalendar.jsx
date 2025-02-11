import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, Transition } from "@headlessui/react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsOpen(true);
  };

  const handleAddTask = () => {
    if (newTask && selectedDate) {
      setEvents([...events, { start: selectedDate, end: selectedDate, title: newTask, status: "Pending" }]);
      setNewTask("");
      setIsOpen(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDeleteOpen(true);
  };

  const handleDeleteTask = () => {
    setEvents(events.filter((e) => e !== selectedEvent));
    setIsDeleteOpen(false);
  };

  const handleUpdateStatus = (status) => {
    setEvents(events.map((e) => (e === selectedEvent ? { ...e, status } : e)));
    setIsDeleteOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-4 w-full">
      <h2 className="text-lg font-semibold mb-2">📅 Task & Schedule Manager</h2>

      {/* Instruction Box */}
      <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg text-sm">
        👉 <strong>Desktop:</strong> Click on a date to add a task. <br />
        👉 <strong>Mobile:</strong> <strong>Hold</strong> a date to add a task.
      </div>

      {/* Calendar wrapped in a responsive container */}
      <div className="overflow-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick}
          style={{ height: 500, minWidth: "600px" }} // Prevents small screens from breaking layout
          eventPropGetter={(event) => {
            let color = "gray";
            if (event.status === "Complete") color = "green";
            else if (event.status === "In Progress") color = "orange";
            return { style: { backgroundColor: color } };
          }}
        />
      </div>

      {/* Add Task Popup */}
      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-2xl w-96 max-w-xs sm:max-w-md">
              <Dialog.Title className="text-xl font-semibold text-gray-800">📝 Add Task</Dialog.Title>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="mt-4 w-full text-lg p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition"
                placeholder="Enter task details..."
              />
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Task
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      {/* Delete/Update Task Popup */}
      <Transition appear show={isDeleteOpen} as="div">
        <Dialog as="div" className="relative z-20" onClose={() => setIsDeleteOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-2xl w-96 max-w-xs sm:max-w-md">
              <Dialog.Title className="text-xl font-semibold text-gray-800">⚙️ Manage Task</Dialog.Title>
              <p className="mt-3 text-gray-700 text-center bg-gray-100 p-3 rounded-lg">{selectedEvent?.title}</p>

              <div className="flex flex-col gap-3 mt-5">
                <button
                  onClick={() => handleUpdateStatus("In Progress")}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  ⏳ Mark as In Progress
                </button>
                <button
                  onClick={() => handleUpdateStatus("Complete")}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  ✅ Mark as Complete
                </button>
                <button
                  onClick={handleDeleteTask}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  🗑️ Delete Task
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TaskCalendar;
