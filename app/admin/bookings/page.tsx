"use client";

import { subjectName, useBookings, useSubjects } from "../../../lib/store";
import type { Booking } from "../../../lib/types";
import { Card, DangerButton } from "../ui";

const STATUS_LABELS: Record<Booking["status"], string> = {
  new: "New",
  contacted: "Contacted",
  done: "Done",
};

export default function BookingsAdmin() {
  const { bookings, saveBooking, deleteBooking } = useBookings();
  const { subjects } = useSubjects();

  const sorted = [...bookings].sort((a, b) => b.createdAt - a.createdAt);
  const newCount = bookings.filter((b) => b.status === "new").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#004643]">Bookings</h1>
        <p className="mt-1 text-sm">
          1-to-1 session requests from the Book a Session page
          {newCount > 0 ? ` — ${newCount} new.` : "."}
        </p>
      </div>

      <Card title="Session requests">
        {sorted.length === 0 ? (
          <p className="text-sm">
            No booking requests yet — they appear here when a student books a
            1-to-1 session.
          </p>
        ) : (
          <ul className="divide-y divide-[rgba(0,70,67,0.15)]">
            {sorted.map((b) => (
              <li key={b.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#004643]">
                      {b.name}
                      <span className="ml-2 rounded-full bg-[rgba(0,70,67,0.08)] px-2 py-0.5 text-xs font-semibold">
                        {STATUS_LABELS[b.status]}
                      </span>
                    </p>
                    <p className="mt-1 text-sm">
                      {b.subjectId
                        ? subjectName(subjects, b.subjectId)
                        : "Any subject"}
                      {b.preferredDay ? ` · ${b.preferredDay}` : ""}
                      {b.preferredTime ? ` · ${b.preferredTime}` : ""}
                    </p>
                    <p className="mt-1 text-sm">
                      {b.whatsapp && <>WhatsApp: {b.whatsapp} </>}
                      {b.email && <>Email: {b.email}</>}
                    </p>
                    {b.message && (
                      <p className="mt-1 text-sm italic">
                        &ldquo;{b.message}&rdquo;
                      </p>
                    )}
                    <p className="mt-1 text-xs">
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        saveBooking({
                          ...b,
                          status: e.target.value as Booking["status"],
                        })
                      }
                      className="rounded-lg border border-[rgba(0,70,67,0.25)] bg-white px-2 py-1.5 text-sm outline-none"
                      aria-label="Booking status"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="done">Done</option>
                    </select>
                    <DangerButton onClick={() => deleteBooking(b.id)}>
                      Delete
                    </DangerButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <p className="text-sm">
        Bookings are stored in this browser only (v1) — the same device that
        received them.
      </p>
    </div>
  );
}
