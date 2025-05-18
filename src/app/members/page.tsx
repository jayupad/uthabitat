import MemberClient from "./MemberClient";

export const metadata = {
  title: 'Member Points | UT Habitat for Humanity',
  description: 'Points and member information.',
}

export default function Members() {
  return (
    <div>
      <MemberClient />
    </div>
  );
}