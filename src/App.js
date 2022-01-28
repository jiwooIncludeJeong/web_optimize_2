import React, {Suspense, useEffect, useState} from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import InfoTable from './components/InfoTable'
import SurveyChart from './components/SurveyChart'
import Footer from './components/Footer'
// import ImageModal from './components/ImageModal'

const lazyWithPreload = (importFunction) => {
    const Component = React.lazy(importFunction)
    Component.preload = importFunction;
    return Component;
}

const LazyImageModal = lazyWithPreload(() => import('./components/ImageModal'));

function App() {
    const [showModal, setShowModal] = useState(false)

    // 1. 버튼 위에 마우스가 올라갔을 때 component preload -> 모듈 파일이 너무 크다면 맞지않는 방법
    // const handleMouseEnter = async () => {
    //     LazyImageModal.preload();
    // }

    // 2. 모든 다른 컴포넌트의 loading이 끝났을 때 preload
    useEffect(()=>{
        LazyImageModal.preload();

        // image preload -> 모듈과 다르게 그때그때 필요에 의해 네트워크 요청 보냄 -> 중복된 이미지여도 중복 호출하게 된다 -> 캐싱 필요
        const img  = new Image();
        img.src = 'https://stillmed.olympic.org/media/Photos/2016/08/20/part-1/20-08-2016-Football-Men-01.jpg?interpolation=lanczos-none&resize=*:800'
    },[])

    return (
        <div className="App">
            <Header />
            <InfoTable />
            <ButtonModal onClick={() => { setShowModal(true) }} /* onMouseEnter={handleMouseEnter}*/>올림픽 사진 보기</ButtonModal>
            {/*important*/}
            <SurveyChart />
            <Footer />
            {/*important*/}
            <Suspense fallback={null}>
                {showModal ? <LazyImageModal closeModal={() => { setShowModal(false) }} /> : null}
            </Suspense>
        </div>
    )
}

const ButtonModal = styled.button`
    border-radius: 30px;
    border: 1px solid #999;
    padding: 12px 30px;
    background: none;
    font-size: 1.1em;
    color: #555;
    outline: none;
    cursor: pointer;
`

export default App
