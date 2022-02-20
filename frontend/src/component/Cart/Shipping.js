import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.js";

import "./Shipping.css";

function Shipping({ history }) {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [pinCode, setPinCode] = useState(
    shippingInfo ? shippingInfo.pinCode : ""
  );
  const [contactInfo, setcontactInfo] = useState(
    shippingInfo ? shippingInfo.contactInfo : ""
  );
  const [address, setAddress] = useState(
    shippingInfo ? shippingInfo.address : ""
  );
  const [country, setCountry] = useState(
    shippingInfo ? shippingInfo.country : ""
  );
  const [state, setState] = useState(shippingInfo ? shippingInfo.state : "");
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (contactInfo.length < 10 || contactInfo.length > 10) {
      alert("Phone number should be of 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, contactInfo, pinCode, country, state, city })
    );
    history.push("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details </h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                size={8}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={contactInfo}
                onChange={(e) => setcontactInfo(e.target.value)}
                size={10}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option>State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
