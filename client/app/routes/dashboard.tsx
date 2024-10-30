import { useAuthStore } from "~/stores/auth";

const Dashboard = () => {
  const { user } = useAuthStore();
  return (
    <div className="p-3">
      <p className="text-2xl">
        Bonjour, <span className="font-bold">{user?.name}</span>.
      </p>
    </div>
  );
};

export default Dashboard;
