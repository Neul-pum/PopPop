import { Dispatch, SetStateAction, useRef } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

interface Props<T> {
  elements: T[];
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
}

const Dropdown = <T extends string>({
  elements,
  selected,
  setSelected,
}: Props<T>) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useOutsideClick(ref, false);

  const handleMenuClick = (e: T) => {
    setSelected(e);
    setIsVisible(false);
  };

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        type='button'
        className='h-full w-72 border border-black'
      >
        {selected}
      </button>
      {isVisible && (
        <ul className='absolute'>
          {elements.map((el) => (
            <li
              onClick={() => handleMenuClick(el)}
              key={el}
              className='h-28 w-100 border border-black'
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
