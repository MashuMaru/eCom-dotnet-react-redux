import agent from "../../app/api/agent";

export default function ErrorTest () {
  
  const handleCall = (errorCode: number) => {
    switch (errorCode) {
      case 400:
        agent.TestErrors.get400()
          .catch(error => console.log('handled', error))
        break;
      case 401:
        agent.TestErrors.get401()
          .catch(error => console.log('handled', error))
        break;
      case 404:
        agent.TestErrors.get404()
          .catch(error => console.log('handled', error))
        break;
      case 500:
        agent.TestErrors.get500()
          .catch(error => console.log('handled', error))
        break;
    }
  }
  
  return (
    <>
      <h1>Errors for testing</h1>
      <button onClick={() => handleCall(400)}>400</button>
      <button onClick={() => handleCall(401)}>401</button>
      <button onClick={() => handleCall(404)}>404</button>
      <button onClick={() => handleCall(500)}>500</button>
      <button onClick={() => agent.TestErrors.getValidationE()}>Validation</button>
    </>
  )
}