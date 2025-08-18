import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Apply/remove "dark" class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 34 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 23 }
  ]);

  const columns = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true }
  ];

  const handleAddUser = () => {
    if (!name || !email || !age) return alert("Please fill all fields!");

    const newUser = { id: users.length + 1, name, email, age: parseInt(age, 10) };
    setUsers([...users, newUser]);

    setName("");
    setEmail("");
    setAge("");
    setPassword("");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header with toggle */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Frontend Assignment Demo</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Add User */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="Name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clearable
            />
            <InputField
              label="Email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              clearable
            />
            <InputField
              label="Age"
              placeholder="Enter age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              passwordToggle
              helperText="Toggle to show/hide"
            />
          </div>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </section>

        {/* DataTable */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">DataTable Component</h2>
          <DataTable
            data={users}
            columns={columns}
            selectable
            onRowSelect={(rows) => console.log("Selected rows:", rows)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
