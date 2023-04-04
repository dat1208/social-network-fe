import React, { useCallback, useEffect } from 'react';
import { Response_Search, SearchItf } from '../../interface/interfaces';
import searchUser from '../../services/api/User/serachUser';
import "./styles-search.css"
import { Avatar } from '@mui/material';
function Search (){
    const [text,setText] = React.useState("");
    const [result,setResult] = React.useState<Array<SearchItf>>();
    const debounce = (func: Function, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: any) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => func(...args), delay);
        };
      };
      
      const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setText(event.target.value);
      };
      
      const debouncedSearchUser = useCallback(
        debounce(async (searchQuery: string) => {
          const data = await searchUser(searchQuery) as unknown as Response_Search;
          setResult(data.Data)
          console.log(result);
        }, 500),
        []
      );
      
      useEffect(() => {
        debouncedSearchUser(text);
      }, [debouncedSearchUser, text]);
      

    return(
        <>
        <div  style={{width:"70%"}} className="input-group row search-input rounded">
            <input type="search" onChange={handleChange} value={text} className="form-control rounded search-input" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>

        {(result && result.length > 0) ?  
        <div style={{width:"20%"}} className='result shadow row rounded bg-white'>
            {result.map(result => (<>
                <a href={'/profile/'+result.Id}>
                 <div className="row p-3">
                    <div className="col-2">
                        <Avatar src={result.AvatarUrl} alt={result.DisplayName}></Avatar>
                    </div>
                    <div className="col-10 align-self-center">
                        <p className='name align-middle'>{result.DisplayName}</p>
                    </div>
                </div>
                </a>   
            </>))}
        </div> 
        : <></>
        }
       
        </>
        
    )
}

export default Search; 