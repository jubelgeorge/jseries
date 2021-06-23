import React, {Fragment} from "react";



const ShowInfoListItems = ({ show }) => {
    const { type, language, genres, status, premiered, officialSite, rating, network, externals } = show;

    return (
        <ul className="list-group"> 

            <li className="list-group-item">
                Official Site{" "}
                {officialSite 
                    ?
                        <a className="label label-default label-pill pull-xs-right" href = {officialSite}>
                            {officialSite}
                        </a>  
                    :
                        <span className="label label-default label-pill pull-xs-right">
                            Not Available
                        </span>  
                }
            </li>

            <li className="list-group-item">
                Premiered{" "}
                {premiered 
                    ?
                        <span className="label label-default label-pill pull-xs-right">
                            {premiered}
                        </span> 
                    :
                        <span className="label label-default label-pill pull-xs-right">
                            Not Available
                        </span>  
                }
            </li>

            <li className="list-group-item">
                Language{" "}
                {language 
                    ?
                        <span className="label label-default label-pill pull-xs-right">
                            {language}
                        </span> 
                    :
                        <span className="label label-default label-pill pull-xs-right">
                            Not Available
                        </span>  
                }
            </li>  

            <li className="list-group-item">
                Type{" "}
                {type 
                    ?
                        <span className="label label-default label-pill pull-xs-right">
                            {type}
                        </span> 
                    :
                        <span className="label label-default label-pill pull-xs-right">
                            Not Available
                        </span>  
                }
            </li>  

            {genres 
                ?
                    <li className="list-group-item">
                        Genres{" "}
                        {genres.map((g) => (
                            <span key={g} className="label label-default label-pill pull-xs-right">
                                {g}
                            </span>
                        ))}
                    </li> 
                :
                <span className="label label-default label-pill pull-xs-right">
                    Not Available
                </span> 
            }

            <li className="list-group-item">
                Status{" "}
                {status 
                    ?
                        <span className="label label-default label-pill pull-xs-right">
                            {status}
                        </span> 
                    :
                        <span className="label label-default label-pill pull-xs-right">
                            Not Available
                        </span>  
                }
            </li>

            {rating 
                ?
                    <li className="list-group-item">
                        Rating{" "}
                        <span className="label label-default label-pill pull-xs-right">
                            {rating.average}
                        </span>
                    </li> 
                :
                <span className="label label-default label-pill pull-xs-right">
                    Not Available
                </span> 
            }

            {network 
                ?
                    <li className="list-group-item">
                        Network{" "}
                        <span className="label label-default label-pill pull-xs-right">
                            {network.name}
                        </span>
                    </li> 
                :
                <span className="label label-default label-pill pull-xs-right">
                    Not Available
                </span> 
            }

            {externals && (
                <Fragment>
                    <li className="list-group-item">
                        IMDB No.{" "}
                        {externals.imdb 
                            ?
                                <span className="label label-default label-pill pull-xs-right">
                                    {externals.imdb}
                                </span> 
                            :
                                <span className="label label-default label-pill pull-xs-right">
                                    Not Available
                                </span>  
                        }
                    </li>
                    <li className="list-group-item">
                        Tv Rage No.{" "}
                        {externals.tvrage
                            ?
                                <span className="label label-default label-pill pull-xs-right">
                                    {externals.tvrage}
                                </span> 
                            :
                                <span className="label label-default label-pill pull-xs-right">
                                    Not Available
                                </span>  
                        }
                    </li>
                    <li className="list-group-item">
                        The TVDB No.{" "}
                        {externals.thetvdb
                            ?
                                <span className="label label-default label-pill pull-xs-right">
                                    {externals.thetvdb}
                                </span> 
                            :
                                <span className="label label-default label-pill pull-xs-right">
                                    Not Available
                                </span>  
                        }
                    </li> 
                </Fragment>
            )}   
        </ul>
    );
};

export default ShowInfoListItems;