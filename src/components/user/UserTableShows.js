import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import UserNav from "./UserNav";
import { getShows, removeShow } from "../../functions/user";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import Spinner from '../layout/Spinner';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import _ from "lodash";
import UserShowPDFDocument from "./UserShowPDFDocument";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";


const UserTableShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false); 

    const { user, showList } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    
    useEffect(() => {
        loadAllShows();
    }, []);

    const loadAllShows = () => {
        //setLoading(true);
        getShows(user.token)
        .then((res) =>{
            //console.log(res);
            //setLoading(false);
            setShows(res.data);        
        })
    } 

    const handleRemoveFromList = (s) => {
        //console.log(e);
        const IMDB = s.imdb;
        if(window.confirm("Delete show?")){
          removeShow(IMDB, user.token)
            .then((res) => {
            //console.log(res.data);
              getShows(user.token)
                .then((res1) =>{
                  //console.log(res);
                  //setLoading(false);
                  setShows(res1.data);        
                
                  let showList1 = []; 
                  if (typeof window !== "undefined") {
                    // if show is in local storage GET it
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('userShowList');
                    }
                    
                    // remove duplicates
                    let unique = _.uniqWith(res1.data, _.isEqual);
                    // save to local storage
                    // console.log('unique', unique)
                    localStorage.setItem('userShowList', JSON.stringify(unique));
            
                    // add to redux state
                    dispatch({
                      type: "ADD_TO_LIST",
                      payload: unique
                    });
                  }
              })
            
              toast.success(`"${res.data.name}" show is removed from your list!`);
            })
            .catch((err) => console.log("Remove show err", err));
        }        
    };  
    
    
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: "center",
        },
        author: {
            fontSize: 12,
            textAlign: "center",
            marginBottom: 40,
            marginTop: 10
        },
        subtitle: {
            fontSize: 18,
            marginBottom: 5
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: "justify",
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
        },
        footer: {
            padding: "100px",
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
        },
        pageNumber: {
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
        },
        tableHeader: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingBottom: 5,
            paddingTop: 5
        },
        tableBody: {
            fontSize: 11,
            textAlign: "center",
            paddingBottom: 10,
            paddingTop: 10
        }
    });

    const showsPDF = () => (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                </Text>
                <Text style={styles.title}>My ShowList</Text>
                <Text style={styles.author}>JSeries</Text>
                <Text style={styles.subtitle}>Shows Summary</Text>

                <Table>
                    <TableHeader>
                        <TableCell style={styles.tableHeader}>NAME</TableCell>
                        <TableCell style={styles.tableHeader}>WATCH STATUS</TableCell>
                    </TableHeader>
                </Table>

                <Table data={shows}>               
                    <TableBody>
                        <DataTableCell style={styles.tableBody} getContent={(x) => x.name} />
                        <DataTableCell style={styles.tableBody} getContent={(x) => x.watchStatus} />
                    </TableBody>
                </Table>
                <Text style={styles.footer}> ~ Thank you for registering with us ~ </Text>
            </Page>
        </Document>
    )
    
    const downloadShowsPDF = () => (
        <PDFDownloadLink
            document={showsPDF()}
            fileName="myShows.pdf"
            className="btn btn-sm btn-block btn-outline-primary mt-3 mb-4"
        >
            Download Shows PDF <DownloadOutlined />
        </PDFDownloadLink>   
    ); 

    let n = 0;
    const handleShowNumber = () => {
        n+=1;
    } 

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <Spinner />
                        ) : (
                        <h4 className="text-danger">Table of Shows</h4>
                    )}             
                
                    <h4>{shows.length} Shows</h4>
                    {downloadShowsPDF()}
                    <br />
                    
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Sl.No.</th>
                            <th scope="col">Name of Show</th>
                            <th scope="col">Watch Status</th>                
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shows.map((s) => (
                            <tr key={s._id}>
                            {handleShowNumber()}
                                <td>{n}</td>
                                <td>{s.name}</td>
                                <td>{s.watchStatus}</td>                                         
                                <td>
                                    <a onClick={(e => handleRemoveFromList(s))}>
                                        <DeleteOutlined className="text-danger" /> <br />
                                    </a> 
                                </td>
                            </tr>                            
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserTableShows;

