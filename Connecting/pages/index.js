import React, {useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

// Internal Imports
import {HomoLogo, Search, Image, FIlter, FaHear, FaInstagram,
AiOutLineYoutube, BsCameraReelsFill, FaRegHeart,Magic} from "../Components/SVG/index";

import {Header, GetStarted, ImageCard, SingleImage,ApertImageCard, Notic, Button, PaymentProssing} from "../Components/index";

import {GET_AI_IMAGES,CHECK_AUTH} from "../Utils/index";


const index = () => {
  const {query} = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState("Reel");
  const [singleID, setSingleID] = useState();
  const [buying, setBuying] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [search, setSearch] = useState("");


  const [activeUser,setActiveUser] = useState();
  const [allAIImages,setAllAIImages] = useState();
  const [allPostCopy,setAllPostCopy] = useState([]);

  const [V3_1024X1024, setV3_1024X1024] = useState();
  const [V3_1792x1024, setV3_1792x1024] = useState();
  const [V3_1024x1792, setV3_1024x1792] = useState();

  const [V2_256x256, setV2_256x256] = useState();
  const [V2_512x512, setV2_512x512] = useState();
  const [V2_1024x1024, setV2_1024x1024] = useState();

  useEffect(()=>{
    if(query.CREDIT_PLAN){
      setBuying(query.CREDIT_PLAN);
    }
  },[query.CREDIT_PLAN]);


  const changeCateogory = (category) =>{
    const model = localStorage.getItem("ACTIVE_MODEL");
    if(model == "AI Image Art Dall-e-v2"){
      if(category == "Reel"){
        setAllAIImages(V2_256x256);
        setAllPostCopy(V2_256x256);
        setCategory("Reel");
      }else if(category == "Instagram"){
        setAllAIImages(V2_512x512);
        setAllPostCopy(V2_512x512);
        setCategory("Instagram");
      }else if(category == "Youtube"){
        setAllAIImages(V2_1024x1024);
        setAllPostCopy(V2_1024x1024);
        setCategory("Youtube");
      }
    }else{
      if(category == "Reel"){
        setAllAIImages(V3_1024x1792);
        setAllPostCopy(V3_1024x1792);
        setCategory("Reel");
      }else if(category == "Instagram"){
        setAllAIImages(V3_1024X1024);
        setAllPostCopy(V3_1024X1024);
        setCategory("Instagram");
      }else if(category == "Youtube"){
        setAllAIImages(V3_1792x1024);
        setAllPostCopy(V3_1792x1024);
        setCategory("Youtube");
      }
    }
  };

  const CALLING_ALL_POST = async() =>{
    try{
      const response = await GET_AI_IMAGES();

      const V2_256x256Temp = [];
      const V2_512x512Temp  = [];
      const V2_1024x1024Temp  = [];

      const V3_1024X1024Temp  = [];
      const V3_1792x1024Temp  = [];
      const V3_1024x1792Temp  = [];

      response.array.forEach(element => {
        if(element.aiModel === "AI Image Art Dall-e-v2"){
          if(element.size === "256x256"){
            V2_256x256Temp.push(element);
          }else if(element.size === "512x512"){
            V2_512x512Temp.push(element);
          }else if(element.size === "1024x1024"){
            V2_1024x1024Temp.push(element);
          }
        }else if(element.aiModel === "AI Image Art Dall-e-v3"){
          if(element.size === "1024x1024"){
            V3_1024X1024Temp.push(element);
          }else if(element.size === "1792x1024"){
              V3_1792x1024Temp.push(element);
          }else if(element.size === "1024x1792"){
            V3_1024x1792Temp.push(element);
          }
        }
      });

      setV2_256x256(V2_256x256Temp);
      setV2_512x512(V2_512x512Temp);
      setV2_1024x1024(V2_1024x1024Temp);

      setV3_1024X1024(V3_1024X1024Temp);
      setV3_1792x1024(V3_1792x1024Temp);
      setV3_1024x1792(V3_1024x1792Temp);

      const model = localStorage.getItem("ACTIVE_MODEL");

      if(model === "AI Image Art Dall-e-v2"){
        setAllAIImages(V2_256x256Temp);
        setAllPostCopy(V2_256x256Temp);

      }else{
        setAllAIImages(V3_1024x1792Temp);
        setAllPostCopy(V3_1024x1792Temp);
      }

      const storedCookiedValue = Cookies.get("token");
      if(storedCookiedValue){
        const user = await CHECK_AUTH();
        setActiveUser(user);
        console.log(response);
      }
    }catch(error){
      console.log(error);
    }
};


useEffect(()=>{
  CALLING_ALL_POST();
},[]);

const onHandleSearch = (value) =>{
  const filterPosts = allAIImages?.filter(({prompt})=>
    prompt.toLowerCase().includes(value.toLowerCase()));
  if(filterPosts.length === 0){
    setAllAIImages(allPostCopy);
  }else{
    setAllAIImages(filterPosts);
  }
};

const onClearSearch = () =>{
  if(allAIImages?.length && allPostCopy?.length){
    setAllAIImages(allPostCopy);
  }
};

useEffect(()=>{
  const timer = setTimeout(()=>setSearch(searchItem),1000);
  return () => clearTimeout(timer);
},[searchItem]);

useEffect(()=>{
  if(search){
    onHandleSearch(search);
  }else{
    onClearSearch();
  }
},[search]);


const arrayRender = [...(allAIImages?.reverse() || [])];


  return <div>
    <Header/>
    <div className="mb-[56px] sm:mb-0 sm:mt-[56px]">
      <div className="flex flex-col">
        <GetStarted activeUser={activeUser}/>
        <div className="w-screen overflow-x-hidden flex flex-col items-center py-4 mt-16 ">
          <a href="/">
          {/* <HomoLogo/> */}
          </a>
        </div>
      </div>
    </div>
  </div>;
};

export default index;
