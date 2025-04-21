import { useRef } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null); // ইনপুট এলিমেন্টকে রেফার করার জন্য

  const handleClick = () => {
    inputRef.current.focus(); // বাটন ক্লিক করলে ইনপুটে ফোকাস যাবে
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Write something..." />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
export default FocusInput