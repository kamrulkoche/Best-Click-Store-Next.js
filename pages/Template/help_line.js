import dynamic from 'next/dynamic';
const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })

export default function Help_line() {
    return (
        <>
            <Title page="Forgot password"></Title>
            <Layout>
                <fieldset>
                    <h1 align="center">Help Line</h1>

                    <table align="center">
                         <tbody>
                            <tr>
                          <td>Message</td>
                                <td>
                                    <textarea name="" id=""></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="dashboard"><button type="submit">Sent</button></a>
                                    <h1></h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </Layout>
        </>
    )
}
