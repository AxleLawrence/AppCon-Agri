import { useState } from "react";
import Sidebar from "../components/Sidebar1";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function TaskCalendarLayout() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");

  // Open modal when a date is clicked
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalOpen(true);
  };
  const [selectedCrop, setSelectedCrop] = useState("Wheat"); // Default selected crop
const [cropTasks, setCropTasks] = useState({});
const crops = {
  Wheat: ["Watering", "Fertilizing", "Pest Control", "Harvesting"],
  Corn: ["Watering", "Weeding", "Fertilizing", "Harvesting"],
  Rice: ["Irrigation", "Weeding", "Fertilizing", "Harvesting"],
};


  const handleAddTask = () => {
    if (taskTitle.trim() !== "") {
      setTasks([
        ...tasks,
        {
          title: taskTitle,
          start: selectedDate,
          status: "In Progress", // Default status
          color: "darkred", // Default color for In Progress
        },
      ]);
      setTaskTitle("");
      setModalOpen(false);
    }
  };
  const toggleCropTask = (task) => {
    setCropTasks((prev) => ({
      ...prev,
      [selectedCrop]: {
        ...prev[selectedCrop],
        [task]: !prev[selectedCrop]?.[task],
      },
    }));
  };
  

  const handleEventClick = (info) => {
    setSelectedTask({
      title: info.event.title,
      start: info.event.startStr,
      status: info.event.extendedProps?.status || "In Progress",
      color: info.event.backgroundColor || "blue",
    });
    setEditModalOpen(true);
  };
  
  // Delete the selected task
  const handleDeleteTask = () => {
    setTasks(tasks.filter((task) => task.title !== selectedTask.title));
    setEditModalOpen(false);
  };

  const handleUpdateStatus = (newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.title === selectedTask.title
          ? {
              ...task,
              status: newStatus,
              color: newStatus === "Complete" ? "green" : "blue", // Change color
            }
          : task
      )
    );
    setEditModalOpen(false);
  };
  
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-grow">
        {/* Task Calendar Section */}
        <main className="p-4">
          <h2 className="text-xl font-semibold mb-4">Task Calendar</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "", // Remove "Today" button
                center: "title",
                right: "prev,next",
              }}
              events={tasks}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              editable
              selectable
              className="w-full"
            />
          </div>
          {/* Crop Growth Reminders */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Crop Growth Stages</h2>
            <select
              className="w-full p-2 border rounded-md mb-3"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              {Object.keys(crops).map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>

            {/* Crop Task Reminders */}
            <div className="space-y-2">
              {crops[selectedCrop].map((reminder) => (
                <div key={reminder} className="flex justify-between">
                  <span>{reminder}</span>
                  <button
                    onClick={() => toggleCropTask(reminder)}
                    className={`px-3 py-1 rounded-md text-white ${
                      cropTasks[selectedCrop]?.[reminder] ? "bg-green-600" : "bg-gray-400"
                    }`}
                  >
                    {cropTasks[selectedCrop]?.[reminder] ? "Done" : "Pending"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Task Input Popup */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2">Add Task</h3>
            <p className="text-sm text-gray-500">Date: {selectedDate}</p>
            <input
              type="text"
              placeholder="Enter task"
              className="w-full p-2 border rounded mt-2 focus:ring-2 focus:ring-green-400"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Delete Task Popup */}
      {editModalOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2">{selectedTask.title}</h3>
            <p className="text-sm text-gray-500">Status: {selectedTask.status}</p>


            {/* Update Status */}
            <div className="mt-4">
              <label className="text-gray-700 font-medium">Update Status:</label>
              <select
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-green-400"
                onChange={(e) => handleUpdateStatus(e.target.value)}
                defaultValue={selectedTask.extendedProps?.status}
              >
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
