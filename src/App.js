import React, { Component } from "react";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      puesto: "",
      departamento: "",
      salario: 0,
      empleados: []
    }
    toast.configure();
  }

  componentDidMount(){
    console.log("Componente cargado");
    this.obtenerEmpleados();
  }

  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addEmpleado(e) {
    let meth = 'POST';
    let url = 'http://localhost:3100/api/empleados';
    let mensaje = 'Empleado agregado correctamente';
    if (this.state._id){
      meth = 'PUT'
      url+='/'+this.state._id;
      mensaje = 'Empleado actualizado correctamente';
    }
    fetch(url,{
      method: meth,
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      toast(mensaje);
      console.log(data)
      this.setState({
        _id: '',
        nombre: '',
        puesto: '',
        departamento: '',
        salario: 0
      });
      this.obtenerEmpleados();
    })
    .catch(err=>console.log(err))

    e.preventDefault();
  }

  obtenerEmpleados(){
    fetch('http://localhost:3100/api/empleados')
    .then(res=>res.json())
    .then(data=> this.setState({empleados: data}))
    .catch(err=>console.log(err))
  }

updateEmpleado(id){
  //console.log("actualizar empleado")
  fetch('http://localhost:3100/api/empleados'+id)
  .then(res=>res.json())
  .then(data=>{
  this.setState({
    _id: data._id,
    nombre: data._nombre,
    puesto: data._puesto,
    departamento: data._departamento,
    salario: data._salario
  });
})
.catch(err=>console.log(err))
}

deleteEmpleado(id){
  //console.log("eliminar empleado")
  if(window.confirm('¿Desea eliminar este empleado?')){
    fetch('http://localhost:3100/api/empleados'+id,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      console.log(data);
      toast('Empleado eliminado correctamente');
      this.obtenerEmpleado();
    })
    .catch((err)=> console.log(err))
  }
}
  render() {
    return (
      <div className="App">
        <nav className="black darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Empelados
            </a>
          </div>
        </nav>
        <ToastContainer />
        <div className="container">
          <div className="row">
            {/*Formulario*/}
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <span className="card-title text-center">
                    Datos del empleado
                  </span>
                  <form onSubmit={(e) => this.addEmpleado(e)}>
                    <div className="row">
                      <div className="input-field col s12">
                        <label htmlFor="lnombre">Nombre</label>
                        <input type="text" id="lnombre"
                        name="nombre" onChange={(e) => this.handleChange(e)}
                        placeholder="Ingrese nombre"
                        value={this.state.nombre}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <label htmlFor="lpuesto">Puesto</label>
                        <input type="text" id="lpuesto"
                        name="puesto" onChange={(e) => this.handleChange(e)}
                        placeholder="Ingrese puesto"
                        value={this.state.puesto}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <label htmlFor="ldepartamento">departamento</label>
                        <input type="text" id="lldepartamento" 
                        name="departamento" onChange={(e) => this.handleChange(e)}
                        placeholder="Ingrese departamento"
                        value={this.state.departamento}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <label htmlFor="lsalario">Salario</label>
                        <input type="text" id="lsalario"
                        name="salario" onChange={(e) => this.handleChange(e)}
                        placeholder="Ingrese salario"
                        value={this.state.salario}/>
                      </div>
                    </div>
                    <button type="submit" className="btn btn bg-mycolor">
                      Guardar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/*Tabla de contenido*/}
            <div className="col s7 font">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    <th>Departamento</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.empleados.map(empleado =>{
                    return (
                      <tr key={empleado._id}>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.puesto}</td>
                        <td>{empleado.departamento}</td>
                        <td>{empleado.salario}</td>
                        <td>
                          <button className="btn"
                          onClick={()=>this.updateEmpleado(empleado._id)}>
                            <i className="material-icons">update</i>
                          </button>
                          <button className="btn"
                          onClick={()=>this.deleteEmpleado(empleado._id)}>
                            <i className="material-icons">delete</i>
                          </button>
                        </td>
                        </tr>
                    )
                  })
                }
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
