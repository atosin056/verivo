import AppShell from "../components/AppShell";
import JobsTable from "../components/Jobstable";
import SectionHeader from "../components/Sectionheader";
export default function Employerjobs() {
  const jobs = [
    {
      id: "job_1",
      title: "Samsung A55 — screen replacement",
      location: "Ikeja",
      postedRelative: "today",
      worker: {
        name: "Tunde Adebayo",
        idNumber: "73",
        avatarUrl: "https://i.pravatar.cc/40?img=12",
      },
      budget: 12000,
      state: "funded_awaiting_accept",
      posted: "Today",
    },
    {
      id: "job_2",
      title: "iPhone 12 — battery swap",
      location: "Yaba",
      postedRelative: "2 hours ago",
      worker: {
        name: "Chiamaka Okoro",
        idNumber: "41",
        avatarUrl: "https://i.pravatar.cc/40?img=32",
      },
      budget: 18500,
      state: "in_progress",
      posted: "Today",
    },
    {
      id: "job_3",
      title: "MacBook Pro — keyboard repair",
      location: "Lekki",
      postedRelative: "yesterday",
      worker: {
        // name: "Emeka Nwosu",
        // idNumber: "58",
        // avatarUrl: "https://i.pravatar.cc/40?img=15",
      },
      budget: 35000,
      state: "in_progress",
      posted: "Yesterday",
    },
    {
      id: "job_4",
      title: "Tecno Spark — charging port fix",
      location: "Surulere",
      postedRelative: "yesterday",
      worker: {
        name: "Fatima Bello",
        idNumber: "19",
        avatarUrl: "https://i.pravatar.cc/40?img=47",
      },
      budget: 8000,
      state: "awaiting_confirm",
      posted: "Yesterday",
    },
    {
      id: "job_5",
      title: "Samsung Galaxy Tab — screen repair",
      location: "Ajah",
      postedRelative: "3 days ago",
      worker: {
        name: "Ibrahim Musa",
        idNumber: "27",
        avatarUrl: "https://i.pravatar.cc/40?img=8",
      },
      budget: 22000,
      state: "complete",
      posted: "3 days ago",
    },
    {
      id: "job_6",
      title: "HP Pavilion — motherboard diagnosis",
      location: "Victoria Island",
      postedRelative: "1 week ago",
      worker: {
        name: "Ngozi Eze",
        idNumber: "64",
        avatarUrl: "https://i.pravatar.cc/40?img=25",
      },
      budget: 15000,
      state: "complete",
      posted: "1 week ago",
    },
    {
      id: "job_7",
      title: "iPhone 13 Pro — camera module",
      location: "Ikoyi",
      postedRelative: "2 days ago",
      worker: {
        name: "Yusuf Abdullahi",
        idNumber: "05",
        avatarUrl: "https://i.pravatar.cc/40?img=52",
      },
      budget: 45000,
      state: "disputed",
      posted: "2 days ago",
    },
  ];

  return (
    <AppShell>
      <div>
        <div>
          <div>
            <SectionHeader
              eyebrow="Your jobs"
              leadText="Every job, with its escrow state.
"
              description="Drafts haven't been funded yet. Funded jobs are waiting for a worker to accept. In-progress jobs are working. Complete jobs are settled."
            />
          </div>
          <div>
            <JobsTable jobs={jobs} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
