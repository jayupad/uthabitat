import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'habitat') { // This should match the password in members/page.tsx
      localStorage.setItem('authenticated', 'true');
      router.push('/members')
      setPassword('')
      onClose()
    } else {
      setPassword('')
      localStorage.removeItem('authenticated');
      alert('Incorrect password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#548c6c] mb-4">Member Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Please enter the member password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[#548c6c] rounded-lg focus:outline-none focus:border-[#FF4B2B]"
              placeholder="Enter password"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#548c6c] text-white rounded-lg hover:bg-[#FF4B2B] transition-colors duration-200"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 