import ContactClient from "./ContactClient";

export const metadata = {
  title: 'Contact Us | UT Habitat for Humanity',
  description: 'Reach out to us with any questions or comments.',
}

export default function Contact() {
  return (
    <div>
      <ContactClient />
    </div>
  );
}