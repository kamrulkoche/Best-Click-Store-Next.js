import Link from 'next/link';
import dynamic from "next/dynamic";

const Title= dynamic(()=>import('../../best_click_store/layout/title'),{
  ssr:false,
})
const Clayout= dynamic(()=>import( '../layout/clayout'),{
  ssr:false,
})
export default function Home() {
  return (

    <>
    <Title page="Change Password"></Title>
    <Clayout>
    <h1 align="center">Change Password</h1>
    <table align="center">
       <tr>
        <td>
            <form>
            <tr>
                    <td>
                    <label>Old Password:</label>
                    &nbsp;<input type="text" placeholder="Old Password" name="pass"></input>
                    </td>
            </tr>
            <tr>
                    <td>
                    <label>New Password:</label>
                    &nbsp;<input type="text" placeholder="New Password" name="pass"></input>
                    </td>
            </tr>
            <tr>
                    <td>
                      <label>Re-Type Password:</label>
                      &nbsp;<input type="text" placeholder="Re-type Password" name="pass"></input>
                    </td>
            </tr>
            <tr>
                    <td  align="center">
                        <input type="submit" className="text-red-400" value="change"></input>
                    </td>
            </tr>
            </form>
        </td>
       </tr>

    </table>
   
   
    
   </Clayout>




   
   
   </>
   
  )
}