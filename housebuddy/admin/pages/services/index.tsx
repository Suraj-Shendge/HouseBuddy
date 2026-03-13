// Services list
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Service = {
  serviceId: string;
  name: string;
  basePrice: number;
  icon: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newIcon, setNewIcon] = useState("");

  useEffect(() => {
    const q = query(collection(db, "services"));
    const unsub = onSnapshot(q, (snap) => {
      const list: Service[] = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data() as any;
        list.push({ serviceId: docSnap.id, ...data });
      });
      setServices(list);
    });
    return () => unsub();
  }, []);

  const addService = async () => {
    if (!newName) return;
    await addDoc(collection(db, "services"), {
      name: newName,
      basePrice: newPrice,
      icon: newIcon,
    });
    setNewName("");
    setNewPrice(0);
    setNewIcon("");
  };

  const deleteService = async (sid: string) => {
    if (confirm("Delete service?")) {
      await deleteDoc(doc(db, "services", sid));
    }
  };

  const updateService = async (sid: string, price: number) => {
    await updateDoc(doc(db, "services", sid), { basePrice: price });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Services</h1>

      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 rounded w-40"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          className="border p-2 rounded w-24"
          placeholder="Base price"
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
        />
        <input
          className="border p-2 rounded w-40"
          placeholder="Icon URL"
          value={newIcon}
          onChange={(e) => setNewIcon(e.target.value)}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={addService}
        >
          Add
        </button>
      </div>

      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Icon</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.serviceId} className="border-b">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.basePrice}</td>
              <td className="p-2">
                {s.icon && <img src={s.icon} alt={s.name} className="h-6 w-6" />}
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    const newAmt = prompt("New price", s.basePrice.toString());
                    if (newAmt) {
                      updateService(s.serviceId, parseInt(newAmt));
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteService(s.serviceId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
