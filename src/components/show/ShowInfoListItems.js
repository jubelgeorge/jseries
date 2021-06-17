import React, {Fragment} from "react";
import { Link } from "react-router-dom";

const ShowInfoListItems = ({ show }) => {
    const { type, language, genres, status, averageRuntime, premiered, officialSite, rating, network, externals } = show;

    return (
        <ul className="list-group">       
            <li className="list-group-item">
                Official Site{" "}
                <a className="label label-default label-pill pull-xs-right" href = {officialSite}>
                    {officialSite}
                </a>
            </li>
            <li className="list-group-item">
                Premiered{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {premiered}
                </span>
            </li>
            <li className="list-group-item">
                Language{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {language}
                </span>
            </li>  
            <li className="list-group-item">
                Type{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {type}
                </span>
            </li>          
            {genres && (
                <li className="list-group-item">
                    Genres{" "}
                    {genres.map((g) => (
                        <span key={g} className="label label-default label-pill pull-xs-right">
                            {g}
                        </span>
                    ))}
                </li>        
            )}
            <li className="list-group-item">
                Status{" "}
                <span className="label label-default label-pill pull-xs-right">
                    {status}
                </span>
            </li>
            {rating && (
                <li className="list-group-item">
                    Rating{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {rating.average}
                    </span>
                </li>       
            )}
            {network && (
                <li className="list-group-item">
                    Network{" "}
                    <span className="label label-default label-pill pull-xs-right">
                        {network.name}
                    </span>
                </li>       
            )}
            {externals && (
                <Fragment>
                    <li className="list-group-item">
                        IMDB No.{" "}
                        <span className="label label-default label-pill pull-xs-right">
                            {externals.imdb}
                        </span>
                    </li>
                    <li className="list-group-item">
                        Tv Rage No.{" "}
                        <span className="label label-default label-pill pull-xs-right">
                            {externals.tvrage}
                        </span>
                    </li>
                    <li className="list-group-item">
                        The TVDB No.{" "}
                        <span className="label label-default label-pill pull-xs-right">
                            {externals.thetvdb}
                        </span>
                    </li>   
                </Fragment>
            )}   
        </ul>
    );
};

export default ShowInfoListItems;
