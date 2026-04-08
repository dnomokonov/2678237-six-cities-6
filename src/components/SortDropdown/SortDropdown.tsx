import {useEffect, useRef, useState} from 'react';
import {SortType} from '../../types/sort.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectCurrentSortOption} from '../../store/selectors';
import {setSortOption} from '../../store/slices/offerSlice.ts';

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();
  const currentSortOption = useAppSelector(selectCurrentSortOption);

  useEffect(() => {
    const handleMouseDown = (event : MouseEvent) => {
      const dropdown = dropdownRef.current;
      if (dropdown && !dropdown.contains(event.target as Element)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleActiveOption = (option : SortType) => {
    dispatch(setSortOption(option));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={dropdownRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleOpen}>
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {Object.entries(SortType).map(([key, value]) => (
            <li
              key={key}
              className={`places__option ${currentSortOption === value ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => {
                handleActiveOption(value);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
