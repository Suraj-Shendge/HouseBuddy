// Providers list
import { useEffect, useState } from "react";
import { collection, query, onSnapshot, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type Provider = {
  pid: string;
  name: string;
  phone: string;
  services: string[];
  rating: number;
  status: string;
};

export default function ProviderList() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const q = query(collection(db, "providers"));
    const unsub = onSnapshot(q, (snap) => {
      const list: Provider[] = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data() as any;
        list.push({ pid: docSnap.id, ...data });
      });
      setProviders(list);
    });
    return () => unsub();
  }, []);

  const approve = async (pid: string) => {
    const ref = doc(db, "providers", pid);
    await updateDoc(ref, {
      verificationStatus: "approved",
      status: "active",
    });
  };

  const block = async (pid: string) => {
    const ref = doc(db, "providers", pid);
    await updateDoc(ref, { status: "blocked" });
  };

  const remove = async (pid: string) => {
    if (confirm("Delete provider?")) {
      await deleteDoc(doc(db, "providers", pid));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Providers</h1>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.pid} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.phone}</td>
              <td className="p-2">{p.rating.toFixed(1)}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => approve(p.pid)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => block(p.pid)}
                >
                  Block
                </button>
                <button
                  className="bg-gray-600 text-white px-2 py-1 rounded"
                  onClick={() => remove(p.pid)}
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
