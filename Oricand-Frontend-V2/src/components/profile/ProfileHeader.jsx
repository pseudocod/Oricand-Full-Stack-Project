export default function ProfileHeader({ user }) {
  return (
    <div>
      <h1 className="text-7xl font-extralight tracking-wide text-gray-900 leading-none mb-3">
        {user.firstName}
      </h1>
      <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
        Welcome to your coffee sanctuary. Track your exclusive drops,
        manage your profile, and stay connected to the community.
      </p>
    </div>
  );
} 