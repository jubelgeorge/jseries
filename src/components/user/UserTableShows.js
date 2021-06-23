import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';
import _ from "lodash";

import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

import { getShows, removeShow } from "../../functions/user";



const UserTableShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false); 

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    
    useEffect(() => {
        loadAllShows();
    }, []);

    const loadAllShows = async () => {
        try {
            setLoading(true);
            const response = await getShows(user.token);
            setShows(response.data);    
            setLoading(false);  
        
        } catch (err) {
            console.log(err);
        }   
    } 

    const handleRemoveFromList = async (s) => {
        try {
            setLoading(true);
            const IMDB = s.imdb;
            if(window.confirm("Delete show?")){
              const response1 = await removeShow(IMDB, user.token);
              const response2 = await getShows(user.token);
              setShows(response2.data);   
      
              if (typeof window !== "undefined") {
                // if show is in local storage GET it
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('userShowList');
                }
                
                // remove duplicates
                let unique = _.uniqWith(response2.data, _.isEqual);
      
                // save to local storage
                localStorage.setItem('userShowList', JSON.stringify(unique));
        
                // add to redux state
                dispatch({
                  type: "ADD_TO_LIST",
                  payload: unique
                });
              }
              toast.success(`"${response1.data.name}" show is removed from your list!`);
            } 
            setLoading(false);  
        
          } catch (err) {
              toast.error("Remove show err", err);
              setLoading(false);
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
                    <h4 className="text-danger">Table of Shows</h4>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <p>Total no. of Shows: <b>{shows.length}</b></p>

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
                        </>
                    )}             
      
                </div>
            </div>
        </div>
    );
};

export default UserTableShows;