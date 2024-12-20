import urunUrl from "../../config/UrunController";
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initUrunState={
    urunList: [],
    isLoadingAdd: false,
    isLoadingGetAll: false
}

export const fetchUrunEkleme = createAsyncThunk(
    'urun/fetchUrunEkleme',
    async (payload)=>{
        try {
            const result = await fetch(urunUrl.urunEkle,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data=> data.json())
            .then(data=>data);
            return result;
        } catch (error) {
            console.log('HATA fetchUrunEkleme...: ', error);
        }
    }
);


export const fetchUrunListele = createAsyncThunk(
    'urun/fetchUrunListele',
    async()=>{
        try {
            const result = await fetch(urunUrl.urunListele,{
                
            }).then(data=> data.json())
            .then(data=>data);
            return result;  
        } catch (error) {
            console.log('HATA fetchUrunListele...: ', error);
        }
    }
);

const urunSlice = createSlice({
    name: 'urun',
    initialState: initUrunState,
    reducers:{},
    extraReducers:(build)=>{
        build.addCase(fetchUrunEkleme.pending,(state)=>{
            state.isLoadingAdd = true;
        });
        build.addCase(fetchUrunEkleme.fulfilled,(state,action)=>{
            state.isLoadingAdd = false;
           // if(action.payload.data){
           //     alert("Ürün Başarı İle Eklendi.")
           // }
        });
        build.addCase(fetchUrunEkleme.rejected,(state)=>{
            state.isLoadingAdd = false;
        });
        build.addCase(fetchUrunListele.pending,(state)=>{
            state.isLoadingGetAll = true;
        });
        build.addCase(fetchUrunListele.fulfilled,(state,action)=>{
            state.isLoadingGetAll = false;
            if(action.payload.status === 200){
                state.urunList = action.payload.data;
            }
        });
        build.addCase(fetchUrunListele.rejected,(state)=>{
            state.isLoadingGetAll = false;
        });

    }
});

export default urunSlice.reducer;