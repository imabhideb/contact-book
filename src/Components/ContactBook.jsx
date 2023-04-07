import React, { useState } from "react";

const ContactBook = () => {

    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [editingIndex, setEditingIndex] = useState(-1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("");

    function addContact(event) {
        event.preventDefault();
        if (!name || !number) {
            alert("Please enter a name and number.");
            return;
        }
        if (contacts.some((c) => c.number === number)) {
            alert("Number already exists.");
            return;
        }
        setContacts([...contacts, { name, number }]);
        setName("");
        setNumber("");
    }

    function deleteContact(index) {
        setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1)]);
    }

    function saveContact(newName, newNumber) {
        if (contacts.some((c, i) => i !== editingIndex && c.number === newNumber)) {
            alert("Number already exists.");
            return;
        }
        setContacts([
            ...contacts.slice(0, editingIndex),
            { name: newName, number: newNumber },
            ...contacts.slice(editingIndex + 1),
        ]);
        setEditingIndex(-1);
    }

    function cancelEdit() {
        setEditingIndex(-1);
    }

    function handleSort() {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }

    function handleFilter(event) {
        setFilter(event.target.value);
    }

    const filteredContacts = contacts.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.number.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedContacts = filteredContacts.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    

    return (
        <div className=" min-h-[100vh] flex bg-home bg-cover bg-center justify-center items-center flex-col">


            {/*Contact Book Container starts here */}
            <div className="mt-[120px] w-[400px] h-[340px] bg-transparent border-[2px] relative rounded-[20px] border-bdr backdrop-blur-[20px] shadow-2xl flex  justify-center items-center ">
                <div className="w-[100%] p-[40px] ">
                    <h1 className=" text-[2em] text-login font-bold text-center">
                        Contact Book
                    </h1>

                    <form onSubmit={addContact}>
                        {/* name */}
                        <label className="ml-1 text-[1.1em]" htmlFor="">
                            Name
                        </label>
                        <div className="flex relative w-[100%] h-[50%] border-b-[2px] border-solid border-login mt-[6px] mb-[30px] mx-0 text-login gap-2">
                            <input
                                id="text"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-[280px] bg-transparent border-none outline-none pl-1 text-[20px] font-semibold"
                            />
                            {/* <span className=" text-[1.3em]">
                                <MdEmail />
                            </span> */}
                        </div>

                        {/* phone */}
                        <label className="ml-1 text-[1.1rem]" htmlFor="">
                            Phone
                        </label>
                        <div className="flex relative w-[100%] h-[50%] border-b-[2px] border-solid border-login mt-[6px] mb-[30px] mx-0 text-login gap-2">
                            <input
                                id="password"
                                type="text"
                                value={number}
                                onChange={(event) => setNumber(event.target.value)}
                                className="w-[280px] bg-transparent border-none outline-none font-semibold pl-1 text-[20px]"
                            />
                            {/* <button className="pl-1 text-[1.3em]">
                                <FaLock />
                            </button> */}
                        </div>

                        {/* button */}
                        <button
                            type="submit"
                            className="w-[100%] h-[45px] bg-login border-none rounded-md cursor-pointer text-[1em] text-white "
                        >
                            Add Contact
                        </button>
                    </form>
                    {/* ----------------- */}
                </div>
            </div>


            <div className="mt-[40px] w-[700px] h-[340px] bg-transparent border-[2px] relative rounded-[20px] border-bdr backdrop-blur-[20px] shadow-2xl flex flex-col text-center justify-center items-center overflow-y-scroll">
                <button className="w-[300px] h-[45px] bg-login border-none rounded-md cursor-pointer text-[20px] text-white mb-2 mt-[20px] " onClick={handleSort}>
                    Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
                </button>
                {/* <input className="w-[280px] bg-transparent border-none outline-none pl-1 text-[20px] font-semibold" type="text" placeholder="Filter" onChange={handleFilter} /> */}
                <div className="flex relative w-[300px] h-[20px] border-b-[2px] border-solid border-login mt-[30px] mb-[30px] ml-[40px] text-login gap-2 " >
                    <input className="w-[280px] bg-transparent border-none outline-none pl-1 pb-2 text-[20px] font-semibold placeholder:text-login placeholder:opacity-60" type="text" placeholder="Search for a name or number" onChange={handleFilter} /> 
                    
                </div>
            

            <ul>
                {sortedContacts.map((contact, index) => (
                    <li key={contact.number}>
                        <span className="text-[20px] font-semibold">{contact.name}:</span>
                        <span className="text-[20px] font-semibold">{contact.number}</span>
                        <button className="bg-login border-none rounded-md cursor-pointer text-[16px] text-white ml-4 px-3 py-1  " onClick={() => deleteContact(index)}>Delete</button>
                        <button className="bg-login border-none rounded-md cursor-pointer text-[16px] text-white ml-4 px-3 py-1  " onClick={() => setEditingIndex(index)}>Edit</button>
                    </li>
                ))}
            </ul>

                {/* Editing starts here */}

                {editingIndex >= 0 && (
                <div className="mt-[10px] w-[400px] h-[340px] bg-transparent border-[2px] relative rounded-[20px] border-bdr backdrop-blur-[20px] shadow-2xl flex flex-col  justify-center items-center mb-3">
                        <form
                            className="flex flex-col  justify-center items-center "
                            onSubmit={(event) => {
                                event.preventDefault();
                                saveContact(event.target.elements.name.value, event.target.elements.number.value);
                            }}
                        >
                            <label className="text-white text-[15px]">
                                Name:
                                <input
                                    className="w-[250px] bg-slate-300 bg-opacity-50 rounded-lg border-none outline-none pl-1 pb-2 ml-2 text-[20px] font-semibold placeholder:text-login placeholder:opacity-60"
                                    type="text"
                                    name="name"
                                    defaultValue={contacts[editingIndex].name}
                                />
                            </label>
                            <label className="text-white text-[15px] mt-2">
                                Number:
                                <input
                                    className="w-[250px] bg-slate-300 bg-opacity-50 rounded-lg border-none outline-none pl-1 pb-2 ml-2 text-[20px] font-semibold placeholder:text-login placeholder:opacity-60"
                                    type="text"
                                    name="number"
                                    defaultValue={contacts[editingIndex].number}
                                />
                            </label>
                            <div className="mt-2">
                                <button className="bg-login border-none rounded-md cursor-pointer text-[16px] text-white ml-4 px-3 py-1  " type="submit">Save</button>
                                <button className="bg-login border-none rounded-md cursor-pointer text-[16px] text-white ml-4 px-3 py-1  " type="button" onClick={cancelEdit}>Cancel</button>
                            </div>
                        </form>
                </div>
                )}
            </div>
        </div>
    );
};

export default ContactBook;
