import React from 'react'
import './Settings.scss';

// component to display eligible products
export default function Settings(props) {
  return (
    <div className={`settings fade-in ${props.animation ? 'fade-in' : 'fade-out'}`}>
      <div className="settings__container">
        <label className="settings__label" htmlFor="returnDays">Return period</label>
        <input
          className="settings__input"
          type="text"
          placeholder="# of days (default 30)"
          name="returnDays"
        />
      </div>
      <div className="settings__container">
        <label className="settings__label" htmlFor="onSale">Include on sale items</label>
        <select
          className="settings__input"
          name="onSale"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
    </div>
  )
}
