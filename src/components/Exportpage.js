import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Accordion, ListGroup, Nav, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const ExportPage = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const platform = query.get('x-platform');
  
  const [export_, setExport_] = useState(null);
  const [document, setDocument] = useState(0);
  const [uploads, setUploads] = useState([]);

  const documents = platform === "3ts" ? [
    `Provisional Invoice`,
    `Freight Forwarder's Cargo Receipt`,
    `Exporter Sheet`,
    `Alex Stewart Certificate of Assay`,
    `Alex Stewart Packing report including weight`,
    `Certificate of Origin-certified by government authorities`,
    `ICGLR Certificate`,
    `Inland Transportation from Mine to the port`,
    `Original Warehouse Certificate`,
    `Certificate of Insurance`,
    `Bill of Lading`,
    `C2 Form`,
    `Mine Sheets`,
    `Processing Sheets`,
    `RRA Customs Declaration`,
    `Tag List`,
    `Other Scanned Exporter Documents`,
    `Other Exporter Documents`,
    `Other Transporter Document`,
  ] : [
    "Exporter Invoice",
    "Packing List",
    "Non-narcotics Note",
    "Essay Report",
    "Proof of Payment of Essay and Witholding Tax",
    "Copy of Customs Declaration",
    "Export Approval"
  ];

  useEffect(() => {
    const getExport = async () => {
      try {
        const response = await fetch(`http://minexx-api.vercel.app/exportnoauth/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setExport_(data.export);
        setUploads(platform === "3ts" ? [
          data.export.provisionalInvoice,
          data.export.cargoReceipt,
          data.export.itsciForms,
          data.export.asiDocument,
          data.export.packingReport,
          data.export.rraExportDocument,
          data.export.rmbExportDocument,
          data.export.otherDocument,
          data.export.warehouseCert,
          data.export.insuranceCert,
          data.export.billOfLanding,
          data.export.c2,
          data.export.mineSheets,
          data.export.processingSheets,
          data.export.customsDeclaration,
          data.export.tagList,
          data.export.scannedExportDocuments,
          data.export.exporterApplicationDocument,
          data.export.transporterDocument
        ] : [
          data.export.provisionalInvoice,
          data.export.packingReport,
          data.export.note,
          data.export.scannedExportDocuments,
          data.export.otherDocument,
          data.export.customsDeclaration,
          data.export.exporterApplicationDocument,
        ]);
      } catch (err) {
        toast.error("Error fetching export details");
        console.error("Error fetching export details:", err);
      }
    };

    getExport();
  }, [id, platform]);

  if (!export_) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loader size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      
      <div className="row">
        <Tab.Container defaultActiveKey="basic">
          <div className='col-xl-12'>
            <div className="card">
              <div className="card-body px-4 py-3 py-md-2">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-7">
                    <Nav as="ul" className="nav nav-pills review-tab" role="tablist">
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link className="nav-link  px-2 px-lg-3" to="#basic" role="tab" eventKey="basic">
                          Shipment Details
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link className="nav-link px-2 px-lg-3" to="#documents" role="tab" eventKey="documents">
                          Documents
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-xxl-12">
            <Tab.Content>
              <Tab.Pane eventKey="basic" id='basic'>
                <div className='card'>
                  <div className='card-body'>
                    <Accordion className="accordion accordion-primary" defaultActiveKey="exportation">
                      <Accordion.Item className="accordion-item" key="exportation" eventKey="exportation">
                        <Accordion.Header className="accordion-header rounded-lg">
                          Exportation Details
                        </Accordion.Header>
                        <Accordion.Collapse eventKey="exportation">
                          <div className="accordion-body">
                            <div className='row'>
                              <div className='col-lg-6'>
                                <img src={export_?.picture ? `https://lh3.googleusercontent.com/d/${export_?.picture}=w2160?authuser=0` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx4xrkRCeiKCPwkflbkXd11W_2fzx34RemdWXmv8TXYWLT2SGtLfkqFCyBb_CBoNcNVBc&usqp=CAU'} alt='' width='100%' height={600} style={{ objectFit: 'cover' }} className='rounded'/>
                              </div>
                              <div className='col-lg-6'>
                                                                { export_?.exportationID ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Exportation ID</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.exportationID || `--`}</Link>
                                                                    </>
                                                                : <></> }

                                                                { export_?.date ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Exportation Date</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.date || `--`}</Link>
                                                                    </>
                                                                : <></> }
                                                            
                                                                { export_?.mineral ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Mineral Type</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.mineral || `--`}</Link>
                                                                    </>
                                                                : <></> }
                                                                
                                                                { export_?.grade ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Grade</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.grade || `--`}</Link>
                                                                    </>
                                                                : <></> }
                                                                
                                                                { export_?.netWeight ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Net Weight</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{platform === '3ts' ? export_?.netWeight : (export_?.netWeight/1000).toFixed(2) || `--`} kg</Link>
                                                                    </>
                                                                : <></> }
                                                                
                                                                { export_?.grossWeight ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Gross Weight</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.grossWeight || `--`} kg</Link>
                                                                    </>
                                                                : <></> }
                                                                
                                                                { export_?.tags ?
                                                                    <>
                                                                        <h4 className="text-primary mb-2 mt-4">Number of Tags</h4>
                                                                        <Link className="text-light" style={{ textDecoration: 'none' }}>{export_?.tags || 0}</Link>
                                                                    </>
                                                                : <></> }
                                                            </div>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </Accordion.Item>
                     
                    </Accordion>
                  </div>
                </div>
              </Tab.Pane>
              
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  );
};

export default ExportPage;