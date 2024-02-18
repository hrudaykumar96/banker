import { useState } from "react";
import DepositForm from "../forms/DepositForm";
import TransferForm from "../forms/TransferForm";
import WithdrawForm from "../forms/WithdrawForm";
import propTypes from "prop-types";
import { useSelector } from "react-redux";
const Transfer = ({ showalert }) => {
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const data=useSelector((state)=>state.userdata.data)
  const opendform = () => {
    setDeposit(true);
  };
  const closedform = () => {
    setDeposit(false);
  };
  const openwform = () => {
    setWithdraw(true);
  };
  const closewform = () => {
    setWithdraw(false);
  };
  const opentform = () => {
    setTransfer(true);
  };
  const closetform = () => {
    setTransfer(false);
  };
  return (
    <div className="tranfer">
      <button className="btn btn-primary" type="button" onClick={opendform}>
        Deposit
      </button>
      <button
        className="btn btn-warning text-light"
        type="button"
        onClick={opentform}
      >
        Money Transfer
      </button>
      <button className="btn btn-success" type="button" onClick={openwform}>
        Withdraw
      </button>
      {deposit && <DepositForm closedform={closedform} showalert={showalert} />}
      {withdraw && (
        <WithdrawForm closewform={closewform} showalert={showalert} />
      )}
      {transfer && (
        <TransferForm closetform={closetform} showalert={showalert} data={data} />
      )}
    </div>
  );
};
Transfer.propTypes = {
  showalert: propTypes.func,
};
export default Transfer;