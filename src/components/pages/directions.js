
/* getFiltreDirection= async (id) =>{
    const autorite=id 
    const autoriteId=autorite.map(x => { return x.id; });
    const directions= this.state.copieDiretions.filter(x => autoriteId.includes(x.autorite.id));
    console.log(directions)
    this.setState({directions:directions})
  }

  getOffresFiltreDirection = async (id) =>{
    const direction=id 
    const directionId=direction.map(x => { return x.id; });
    let offres = this.state.offresFiltre.filter(x => directionId.includes(x.direction.id));
    console.log(offres)
    if(this.state.statut===''){
      this.setState({offres:offres})
      
    }else{
      const offre=offres.filter(offre=>offre.statut===this.state.statut)  
      this.setState({offres:offre})
    }

  } */








/* getDirection= async () =>{
    
    try {
        this.setState({ isLoading: true });
        const response = await fetch(API_BASE_URL+"directions",
          {
            headers: {
                Accept: 'Application/json',
            }});
        const data = await response.json();
      
        this.setState({ directions: data,copieDiretions:data, isLoading: false});
        
    } catch (err) {
        this.setState({ isLoading: false });
        console.error(err);
    }
  } */
 


 
/*  <div className="height_space"></div>

              <div
                className="type_de_marche directions"
                style={{
                  backgroundColor:this.state.directionclicked? "#DFE3E3" : "#EEF0F0",
                }}
              >
                <div className="div_type_marche_txt div_direction_txt">
                  <h6 className="title_typemarche direction_typemarche">SERVICES / DIRECTIONS</h6>
                </div>
              </div>
              { this.state.directionclicked && this.state.typeautoriteclicked? (
                <div className="type_de_marche_exp direction_exp">
                {this.state.isLoading }
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={this.state.directions}
                    getOptionLabel={(option) => option.libelle}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Toutes"
                        placeholder="Rechercher"
                      />
                    )}
                    onChange={(event, newValue) => {
                      this.getOffresFiltreDirection(newValue)
                    }}
                  />

                </div>
              ) : (
                <></>
              )}
              
                */