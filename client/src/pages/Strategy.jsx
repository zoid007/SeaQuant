import { Button, Header, HeaderName, SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, ModalWrapper, Modal, TextInput, Select, SelectItem, Dropdown, MultiSelect } from '@carbon/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Breadcrumb,
  BreadcrumbItem,
  OverflowMenu,
  OverflowMenuItem

} from '@carbon/react';
import { rows, headers } from '../utills/Table-data';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.scss'
import { Sidebar } from "../components"
import { useEffect, useState } from 'react';
import axios from 'axios';
function Strategy() {

  const [Selected, setSelected] = useState("Drag and Drop")
  const [StrategyName, setStrategyName] = useState("")
  const navigate = useNavigate();

  const handleInput = (e) => {
    setStrategyName(e.target.value)
  }

  const handleSubmit = async (e) => {
    console.log(StrategyName, Selected)

    const API = axios.create({ baseURL: 'http://localhost:8000' })

    API.interceptors.request.use((req) => {
      if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
          }`;
      }
      return req;
    })
    const data = {
      name: StrategyName, type: Selected, direction: "Unavilable"
    }
    const res = await API.post('/strategy/savedragdropstrategyname', data)

    navigate("/dragdrop?id=" + res.data.data._id)
  }


  const onStrategyClick = (row) => {

    console.log(row.type)

    if (row.type == "Drag and Drop"){
      navigate("/dragdrop?id="+row._id)
    }

  }


  const [StrategyList, setStrategyList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/strategy/getallstrategy')
      .then(response => setStrategyList(response.data.data))
      .catch(error => console.log(error));
  }, []);

  console.log(Selected)


  const BuildType = [
    {
      id: "Drag and Drop",
      label: "Drag and Drop",
    },
    {
      id: "CLI / Low Code",
      label: "CLI / Low Code",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="App-box">

        <Breadcrumb>
          <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/">All Strategy</BreadcrumbItem>
        </Breadcrumb>

        <section>
          <div className="App-heading">
            <h2>Strategy</h2>

            <ModalWrapper
              handleSubmit={handleSubmit}
              buttonTriggerText="Create Strategy"
              primaryButtonText="Add"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>
                We are delighted to introduce two powerful strategy building methods: the Command-Line Interface (CLI) Strategy Builder and the Drag-and-Drop Strategy Builder.
              </p>
              <br></br>
              <b>CLI Strategy Builder</b>
              <p style={{ marginBottom: '1rem' }}>
                For those who prefer the precision and control of textual input, the CLI Strategy Builder is a dream come true. This method allows users to write commands and scripts that define their strategic objectives and actions.      </p>

              <p style={{ marginBottom: '1rem' }}>
                Drag-and-Drop Strategy Builder: Visualize and Simplify

                The Drag-and-Drop Strategy Builder offers a visually appealing, user-friendly experience for designing strategies without any coding knowledge. This option enables users to create strategies using a series of pre-built components that can be customized and arranged to meet specific requirements.</p>

          
              <Dropdown
                    ariaLabel="Dropdown"
                    id="select-indicator"
                    items={BuildType}
                    label="Attribute"
                    size="md"
                    disabled={false}
                    className="Drag-and-Drop-Node"
                    onChange={(e) => {
                       setSelected(e.selectedItem.id)
                    }}
                  />


              <TextInput
                data-modal-primary-focus
                id="text-input-1"
                labelText="Strategy name"
                placeholder="e.g. SMACrossOver"
                style={{ marginBottom: '1rem' }}
                onChange={(e) => { handleInput(e) }}
              />
            </ModalWrapper>
          </div>
        </section>


        <div className='App-Content' style={{ marginTop: '2rem' }}>
          <Table size="sm">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader id={header.key} key={header}>
                    {header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {StrategyList.map((row) => (
                <TableRow key={row._id} onClick={(e) => {onStrategyClick(row)}}>
                  {Object.keys(row)
                    .filter((key) => key !== '_id' && key !== 'draganddroplogic')
                    .map((key) => {
                      return <TableCell key={key}>{row[key]}</TableCell>;
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Strategy
