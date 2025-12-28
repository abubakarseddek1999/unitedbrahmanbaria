import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/+8801728306504"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 flex items-center justify-center w-12 h-12 z-50 hidden md:block "
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsApp;