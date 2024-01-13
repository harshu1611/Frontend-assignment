import React, { useState, useEffect } from 'react';
import './global.css'
import { Switch } from '@headlessui/react'
import { RadioGroup } from '@headlessui/react'


const FormRenderer = () => {
  const [uiSchema, setUiSchema] = useState('');
  const [schemaJson,setSchemaJson]=useState([])
  const [formFields, setFormFields] = useState([]);
  const [extraFields,setExtraFields]=useState(false);
  const[validJson,setValidJson]=useState(true)
  useEffect(() => {
    try {
      const parsedSchema = JSON.parse(uiSchema);
      // setFormFields(parsedSchema)
      setValidJson(true)
      setSchemaJson(parsedSchema)

      const initialFormData = initializeFormData(parsedSchema);
    setFormData(initialFormData);
    } catch (error) {
      console.error('Invalid JSON schema');
      setValidJson(false)
    }

    console.log(schemaJson)
  }, [uiSchema]);

  const initializeFormData = (schema:any) => {
    const initialFormData = [{}];
  
    const traverseSchema = (node:any) => {
      if (node.jsonKey && node.validate && node.validate.defaultValue) {
        // Check if defaultValue exists and assign it to formData
        initialFormData[node.jsonKey] = node.validate.defaultValue;
      }
  
      if (node.subParameters) {
        node.subParameters.forEach(traverseSchema);
      }
    };
    schema.forEach(traverseSchema);
    return initialFormData;
  }
  
   
  const handleSchemaChange = (e:any) => {
    setUiSchema(e.target.value);
  };

  

  const [radioStates, setRadioStates] = useState<any>({});
  const [formData, setFormData] = useState<any>({});

  const handleFormData=(key:string,value:any)=>{
        setFormData((prevStates:any)=>({
          ...prevStates,
          [key]: value
        }))

        return 0;
  }
  const handleRadioChange = (groupKey: string, value: any) => {

   
    setRadioStates((prevStates: any) => ({
      ...prevStates,
      [groupKey]: value,
    }));
  };
  const input=(data:any)=>{
   
      return(
        <div className='flex flex-row justify-between items-center w-full p-2 bg-[#F5F5FF] rounded-xl'>
        <label htmlFor={data.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
      {data.label}
      {data.validate && data.validate.required && (
    <span className="text-red-500">*</span>
  )}
    </label>
    <div className="mt-2">
      <input
        type='text'
        id={data.jsonKey}
        key={data.jsonKey}
        className="block w-80 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
        placeholder={data.placeholder} required={data.validate.required} contentEditable={data.validate.immutable} disabled={data.disable}
        pattern={data.validate.pattern}
        onChange={(e:any)=>handleFormData(data.jsonKey,e.target.value)}
      />
        </div>
      
    </div>
      )
  }

  const radioFromGroup=(group?:any,subP?:any)=>{
    // console.log(data)

    return(
      <>
      <label htmlFor={subP.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
{subP.label}
{subP.validate && subP.validate.required && (
    <span className="text-red-500">*</span>
  )}
</label>
<div className="mt-2 flex flex-row space-x-2 bg-[#F5F5FF] p-2">
{subP.validate.options.map((opt:any)=>{
// if(!radioStates){
//   handleRadioChange(group?.jsonKey + '.'  +subP.jsonKey,subP.validate.defaultValue)
// }
// if(subP.validate.defaultValue){
//   handleFormData(group.jsonKey + '.'  +subP.jsonKey,opt.value)
// }


  return(
      <>
     
<RadioGroup value={formData[group.jsonKey + '.'  +subP.jsonKey]} onChange={()=>{
  //  handleRadioChange( group.jsonKey + '.'  +subP.jsonKey,opt.value)
   handleFormData(group.jsonKey + '.'  +subP.jsonKey,opt.value)
}} className="mt-2" defaultChecked={subP.validate.defaultValue===opt.value} >
       
        <div className="flex flex-col justify-center w-full">
            <RadioGroup.Option
              key={subP.jsonKey}
              value={opt.value}
              className={({ active, checked }) =>
                
                {  return `
                  ${active ? 'ring-2 ring-[#D3E0FF] ring-offset-2' : ''},
                  ${checked
                  ? 'bg-[#D3E0FF] text-black hover:bg-[#B4C8E8]'
                  : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50'}
                  'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold  sm:flex-1 w-[100%]'`;}
                
              }
             defaultChecked={subP.validate.defaultValue===opt.value}
             
            >
              <RadioGroup.Label as="span">{opt.label}</RadioGroup.Label>
            </RadioGroup.Option>
        
        </div>
      </RadioGroup>

{
  // console.log(radioStates)
}
{/* <label htmlFor={subP.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
    {opt.label}
</label> */}
      </>
  )
})}
  </div>

  
            

      </>
      
    )
  }
  const radio=(data:any)=>{
    // console.log(data)
    return(
      <>
      <label htmlFor={data.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
{data.label}
{data.validate && data.validate.required && (
    <span className="text-red-500">*</span>
  )}
</label>
<div className="mt-2 flex flex-row space-x-2 bg-[#F5F5FF] p-2">
{data.validate.options.map((opt:any)=>{
if(!radioStates){
  handleRadioChange(data.jsonKey,data.validate.defaultValue)
}
  return(
      <>
     <div className="flex flex-col justify-around items-stretch w-full">
<RadioGroup value={radioStates[data.jsonKey]} onChange={()=>{
  //  handleRadioChange( data.jsonKey,opt.value)
   handleFormData(data.jsonKey,opt.value)
}} className="mt-2">
       
        
            <RadioGroup.Option
              key={data.jsonKey}
              value={opt.value}
              className={({ active, checked }) =>
                
                {  return `
                  ${active ? 'ring-2 ring-[#D3E0FF] ring-offset-2' : ''},
                  ${checked
                  ? 'bg-[#D3E0FF] text-black hover:bg-[#B4C8E8]'
                  : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50'}
                  'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold  sm:flex-1 w-[100%]'`;}
                
              }
             defaultChecked={data.validate.defaultValue===opt.value}
            >
              <RadioGroup.Label as="span">{opt.label}</RadioGroup.Label>
            </RadioGroup.Option>
        
        
      </RadioGroup>
      </div>
{
  // console.log(radioStates)
}
{/* <label htmlFor={subP.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
    {opt.label}
</label> */}
      </>
  )
})}
  </div>

  
            

      </>
      
    )
  }

  const select=(data:any)=>{
      return(
        <div className='flex flex-row justify-between items-center w-full bg-[#F5F5FF] p-2'>
                <label htmlFor={data.jsonKey} className=" text-sm font-medium leading-6 text-gray-900">
                 {data.label}
                 {data.validate && data.validate.required && (
    <span className="text-red-500">*</span>
  )}
                </label>
                <select
                  id={data.jsonKey}
                  name=""
                  key={data.jsonKey}

                  className="mt-2 block w-80 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={data.validate.defaultValue}
                  // onChange={(e:any)=>{handleFormData(data.jsonKey,e.target.value)}}
                  onChange={(e:any)=>{
                    handleFormData(data.jsonKey,e.target.value)
                  }}
                  
                >
                  {
                    data.validate.options.map((option:any)=>{
                      return(
                        <option value={option.value} >{option.label}</option>
                      )
                    })
                  }
                 
                </select>
                </div>
      )
  }

  const switchFn=(data:any)=>{
    return(
      <div key={data.jsonKey} className='bg-[#F5F5FF] p-2'>
      <input
type="checkbox"
name=""
typeof=''
id={data.jsonKey}
defaultChecked={data.validate.defaultValue}
className="appearance-none-r-0"
placeholder={data.placeholder}
onChange={(e:any)=>{
  const isChecked= e.target.checked
  handleFormData(data.jsonKey,isChecked)}}
/>
<label htmlFor={data.jsonKey} className=" ml-2 text-sm font-medium leading-6 text-gray-900">
{data.label}
{data.validate && data.validate.required && (
    <span className="text-red-500">*</span>
  )}
</label>
   </div>
    )
  }
  
  const Group=(group:any)=>{
    // const [checked,setChecked]=useState()
    return(
      <div className='flex flex-col justify-between  w-full p-2 bg-[#F5F5FF] rounded-xl' key={group.jsonKey}>
        <label htmlFor={group.jsonKey} className=" ml-2 text-sm font-medium leading-6 text-gray-900">
{group.label}
{group.validate && group.validate.required && (
    <span className="text-red-500">*</span>
  )}
</label>
<div className='h-[1px] w-full bg-gray-400'></div>
        {
          group.subParameters.map((subP:any)=>{
           
            return(
              subP.uiType==="Radio"?
      
              radioFromGroup(group,subP)
              :
              subP.uiType==="Ignore"?
           
              (
                
                (formData[subP.conditions[0].jsonKey]===subP.conditions[0].value && subP.conditions[0].action==="enable") ?
                (
                  subP.subParameters.map((nestedSubP:any)=>{
                    return(
                      nestedSubP.uiType==="Select" ?
                      select(nestedSubP)
                      :
                      nestedSubP.uiType==="Input" ? 
                      input(nestedSubP)
                      :
                      nestedSubP.uiType==="Switch" ? 
                     switchFn(nestedSubP)
                      :
                      nestedSubP.uiType==="Radio" ?
                      radioFromGroup(subP,nestedSubP)
                      :
                      <></>
                    )
                  })
                )
                :
                (formData[subP.conditions[0].jsonKey]!==subP.conditions[0].value) ?
                (
                  subP.subParameters.map((nestedSubP:any)=>{
                formData[nestedSubP.jsonKey]= null
                  })
                )
                :
                 <></>
               
              
                
              )
              :
                  subP.uiType==="Select" ? 
                 select(subP)
                  
                  :
                  subP.uiType==="Switch" ?
                  switchFn(subP)
                  :
                  <></>
            )
          })
        }
        </div>
    )
  }
  return (
    <div  className='h-screen'>
      {/* Left Section - JSON Editor */}
      <div className='flex p-2 h-full'>
        <textarea
          className='h-auto w-[50%] border-2 border-black p-2 mr-2'
          placeholder="Paste UI Schema here"
          value={uiSchema}
          onChange={handleSchemaChange}
        />
        {
          uiSchema && validJson ?
          <div className='w-full p-4 flex flex-col space-y-4'>
            
          {schemaJson.map((data:any)=>{
            return(
              data.validate.required && data.uiType==="Input" ? 
             input(data)
              :
              data.validate.required  && data.uiType==="Group"?
              Group(data)
              :
              data.validate.required && data.uiType==="Radio"?
              radio(data)
              :
              data.validate.required  && data.uiType==="Select" ?
              select(data)
              :
              data.validate.required && data.uiType==="Switch" ?
              switchFn(data)
              :
              
             
              extraFields && 
              
                data.uiType==="Input" ? 
                input(data)
                 :
                 extraFields &&  data.uiType==="Group"?
                 Group(data)
                 :
                 extraFields &&    data.uiType==="Radio"?
                 radio(data)
                 :
                 extraFields && data.uiType==="Select" ?
                 select(data)
                 :
                 extraFields && data.uiType==="Switch" ?
                 switchFn(data)
                 :
                 <></>
              

             
             
            )
          })}
         
      
         <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={extraFields}
        onChange={()=>setExtraFields(!extraFields)}
        className=
        {  `${extraFields ? 'bg-indigo-600' : 'bg-gray-200'}
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`
        }
      >
        <span
          aria-hidden="true"
          className=
          {  `${extraFields ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">Show Advanced Fields</span>{' '}
      </Switch.Label>
    </Switch.Group>
    <div className='flex flex-row justify-end w-full space-x-2 pb-4'>
    <button
        type="button"
        className="rounded-lg bg-white px-2 py-1 text-s font-semibold text-gray-500 shadow-sm hover:bg-gray-600 hover:text-white border-2 border-gray-500"
        onClick={()=>{
          setUiSchema('')
          setFormData({})
          setValidJson(true)
        }}
       >
       Cancel
      </button>
      <button
        type="button"
        className="rounded-lg bg-gray-500 px-2 py-1 text-s font-semibold text-white shadow-sm hover:bg-gray-600  border-2 border-gray-500" onClick={()=>{
          console.log((formData))
        }}
      >
       Submit
      </button>
      
    </div>
    <h1 className='text-s text-gray-500 text-end'>See Console for the sent Data</h1>
   
        </div>
        
           : 
           uiSchema && !validJson ?
           <div className='flex h-full w-full justify-center items-center'>
           <h1 className='text-red-500'>Invalid JSON Schema</h1>
          </div>
           :
           <div className='flex h-full w-full justify-center items-center'>
            <h1 className='text-gray-500'>Please enter Schema to Render Form</h1>
           </div>
        }
        
      </div>

      
    </div>
  );
};

export default FormRenderer;

