import Dropdown from './dropdown';
import Button from '../../../../components/button/button';

export function initDropdown(wrapperClass: string, buttons: Record<string, any>): Dropdown {
  const dropdownBox = new Dropdown({ wrapperClass });

  for (let i = 0; i < buttons.length; i += 1) {
    const menuBtn = new Button(buttons[i]);
    const menuBtnLi = document.createElement('li');
    menuBtnLi.appendChild(menuBtn.element);
    dropdownBox.dropdown.appendChild(menuBtnLi);
  }

  return dropdownBox;
}
