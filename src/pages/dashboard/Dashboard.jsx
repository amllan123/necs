import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './dashboard.scss'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widgets/Widget'
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import { useParams } from 'react-router-dom'
import Branch from '../../components/masterlist/branch/Branch'
import AccountGroup from '../../components/masterlist/accountgroups/AccountGroup'
import AccountHead from '../../components/masterlist/accounthead/AccountHead'
import Parties from '../../components/masterlist/parties/Parties'
import DepositeScheme from '../../components/masterlist/depositscheme/DepositeScheme'
import TypeofLoan from '../../components/masterlist/typeofloans/TypeofLoan'
import Voucher from '../../components/masterlist/vouchernarration/Voucher'
import MemberDetails from '../../components/processAndInput/memberdetails/MemberDetails'
import ApplicationForLoan from '../../components/processAndInput/applicationForLoan/ApplicationForLoan'
import SanctionOfLoan from '../../components/processAndInput/sanctionoflaon/SanctionOfLoan'

const Dashboard = () => {
  const { category } = useParams()
  return (
    <>
      <div className='dashboardContainer'>
        <Sidebar />
        <div className='dashboardDatacontainer'>
          <Navbar />

          {category!==("sanctionofloan") && <div className="widgets">
            <Widget icon={<PersonIcon />} color={"#80B3FF"} count={2500} title={"Total Members"} />
            <Widget icon={<BusinessIcon />} color={"#D0BFFF"} count={33} title={"Branches"} />
            <Widget icon={<PersonIcon />} color={"#C1D8C3"} count={2500} title={"Deposit Members"} />
            <Widget icon={<PersonIcon />} color={"#CAEDFF"} count={2500} title={"Loan Members"} />
            <Widget icon={<PersonIcon />} color={"#CEDEBD"} count={2500} title={"Loan Defaulter"} />
            <Widget icon={<PersonIcon />} color={"#FFE17B"} count={2500} title={"Deposit Defaulter"} />

          </div>}

          <div className="componentContainer">
{/*------------------------------- MasterList-----------------------------------------  */}
            {category === "branch" && <Branch />}
            {category === "agp" && <AccountGroup />}
            {category === "ahd" && <AccountHead />}
            {category === "parties" && <Parties />}
            {category === "dpschm" && <DepositeScheme />}
            {category === "typeofloan" && <TypeofLoan/>}
            {category ==="voucher" && <Voucher/>}
{/* ------------------------------- Processes and Input ----------------------------------- */}
            {category === "memberdetail" && <MemberDetails/>}
            {category === "applicationforloan" && <ApplicationForLoan/>}
            {category ==="sanctionofloan" && <SanctionOfLoan/>}
          </div>
        </div>
      </div>

    </>

  )
}

export default Dashboard