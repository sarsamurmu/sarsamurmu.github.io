import s from '@/styles/anim_parts.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/dist/CustomEase'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useCallback, useContext, useRef } from 'react'
import { AnimCtx } from './animation_manager'
import Image from 'next/image'
import { DM_Mono, Inter } from 'next/font/google'
import leaf_svg from '/assets/leaf.svg'
import leaf2_svg from '/assets/leaf_2.svg'
import hey_svg from '/assets/hey.svg'

// ScrollTrigger.defaults({ markers: true })

export const BallAnimation = () => {
  const ballSize = 20
  const am = useContext(AnimCtx)
  const ref = useRef()

  useGSAP(() => {
    const el = ref.current
    const getScale = () => Math.max(window?.innerWidth ?? 0, window?.innerHeight ?? 0) / 20 * 1.5

    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        duration: 2
      },
      onComplete: () => am.setCurrent('logo'),
      paused: true,
      delay: 0.8
    })
    .set(el, { scale: 0, opacity: 0, z: 0.01 })
    .to(el, {
      motionPath: {
        path: '#ball_path',
        align: '#ball_path',
        alignOrigin: [0.5, 0.5]
      },
      ease: 'circ.inOut',
    })
    .to(el, {
      scale: 50,
      ease: 'power1.in',
      duration: 2
    }, '<')
    .to(el, { opacity: 1, duration: 0.5 }, '<')
    .to(el, { scale: getScale(), duration: 3 }, '>0.7')
    .to(el, { x: 0, y: 0, xPercent: -50, yPercent: -50, top: '50%', left: '50%' }, '<1')

    am.bind('ball', tl)

    const resizeListener = () => {
      gsap.set(el, { scale: getScale() })
    }

    window.addEventListener('resize', resizeListener)

    return () => window.removeEventListener('resize', resizeListener)
  }, [am.current])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden',
      height: '100vh',
      width: '100vw'
    }}>
      <svg className={s.ballPath} height={500} viewBox="0 0 1699 837" version="1.1">
        <path id='ball_path' style={{
          stroke: 'none',
          fill: 'none'
        }} d="M0.5,0.5C0.5,0.5 1180.52,15.982 1460.3,199.95C1615.19,301.797 1756.6,412.859 1672.48,645.529C1597.83,852.038 1063.53,901.561 728.28,741.011" />
      </svg>
      <div ref={ref} style={{
        display: 'inline-block',
        background: 'white',
        height: ballSize,
        width: ballSize,
        borderRadius: 1000,
        opacity: 0,
        position: 'absolute',
        boxShadow: '#d3d6ff 0px 0px 6px 0px'
      }} />
    </div>
  )
}

export const WelcomeText = () => {
  const am = useContext(AnimCtx)
  const ref = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })
    .set(ref.current, { y: 20 })
    .to(ref.current, { opacity: 1, y: 0, duration: 0.3 })

    am.bind('logo', tl)
  }, [am.current])

  return (
    <Image className={s.welcomeText} src={hey_svg} ref={ref} style={{ opacity: 0 }} alt="Hey it's" />
  )
}

export const NameLogo = () => {
  const containerRef = useRef()
  const am = useContext(AnimCtx)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })
    .set('#text', {
      scale: 0.95,
      transformOrigin: '50% 50%'
    })
    .set('g path', {
      strokeDasharray: (i, target) => target.getTotalLength(),
      strokeDashoffset: (i, target) => target.getTotalLength()
    })
    .to('g path', { strokeDashoffset: 0, duration: 3, ease: CustomEase.create('', '0.47, 0, 0.745, 0.715') })
    .to('g path', { fillOpacity: 1, duration: 1 })
    .to('g path', { strokeOpacity: 0, duration: 0.5 }, '<0.5')
    .to('#bg', { strokeOpacity: 1, duration: 1 })
    .to('#text', { scale: 1, duration: 1 }, '<')
    .to('#bg', { strokeDashoffset: 400, duration: 4 }, '>-1')
    .to('#bg', { strokeOpacity: 0, fillOpacity: 1, duration: 1, onStart: () => am.setCurrent('about') }, '>-2')

    am.bind('logo', tl)

    if (am.isCurrent('logo')) {
      const colors = [
        ['#FFF900', '#009AFF'],
        ['#F500FF', '#0F00FF'],
        ['#00FCFF', '#007D09'],
        ['#59FF00', '#393939'],
        ['#FF9E00', '#771BFF'],
        ['#0082FF', '#5BFBFF']
      ]
      const tl2 = gsap.timeline({ repeat: -1, yoyo: true, delay: tl.duration(), defaults: { duration: 2 } })
      colors.forEach(([bg, fg], idx) => {
        tl2.to('#text', { color: fg }, '+=10')
        tl2.to('#bg', { fill: bg }, '<')
        if (idx == colors.length - 1) tl2.set({}, {}, '+=10')
      })
    }
  }, { scope: containerRef, dependencies: [am.current] })

  return (
    <>
      <svg className={`${s.nameLogo} ${s.svg}`} ref={containerRef} viewBox="0 0 1024 768" version="1.1">
        <path id='bg' style={{
          fill: 'rgb(10,0,255)',
          stroke: 'rgb(10,0,255)',
          strokeDasharray: 147,
          strokeOpacity: 0,
          strokeWidth: 3
        }} d="M129.154,158.428C84.256,186.597 125.182,250.656 118.31,302.279C114.373,331.857 84.628,347.846 78.783,376.17C71.74,410.299 96.899,435.765 96.703,467.892C96.621,481.232 88.446,494.656 82.412,505.982C62.847,542.71 65.375,575.566 87.445,610.144C97.054,625.198 110.086,641.024 127.291,647.504C172.018,664.35 221.826,624.977 266.35,622.836C305.861,620.935 339.894,647.507 379.489,643.318C416.345,639.418 442.746,603.676 479.249,595.015C517.296,585.987 559.482,609.114 598.027,608.971C635.122,608.834 665.726,585.372 701.984,582.731C752.392,579.058 832.536,650.927 877.186,619.935C907.458,598.923 881.843,548.697 895.074,520.425C903.981,501.391 924.119,480.379 920.046,457.853C913.486,421.576 865.682,399.176 862.291,376.345C856.961,340.451 889.015,306.437 889.495,269.85C889.971,233.606 844.946,228.931 828.802,204.143C807.049,170.745 839.589,135.852 797.248,103.343C744.906,63.155 699.136,141.417 648.949,139.87C600.556,138.378 557.883,120.921 509.661,137.39C473.965,149.582 446.543,194.823 409.11,197.448C363.298,200.661 331.944,172.34 277.584,150.355C213.96,124.624 160.23,138.932 129.154,158.428Z" />
        <g id='text' style={{ color: '#00ff74' }}>
          <g>
            <g>
              <path d="M290.787,456.998C295.093,448.912 303.379,436.551 301.646,426.947C298.674,410.472 281.361,399.142 275.416,383.776C275.416,383.776 280.425,384.251 280.425,384.251C286.823,398.726 304.009,411.091 306.041,427.211C307.259,436.869 299.953,448.703 296.819,457.58C291.489,472.898 290.942,486.693 289.856,502.766C288.813,518.184 287.261,533.637 286.929,549.094C294.455,547.138 301.979,545.174 309.52,543.273C310.905,527.617 314.363,512.092 316.87,496.593C318.685,485.377 318.978,473.871 321.575,462.818C324.046,452.305 331.655,436.759 328.687,425.828C325.102,412.623 310.247,401.765 301.92,391.556C298.684,387.589 293.566,381.978 293.375,376.409C282.633,377.165 271.893,377.968 261.151,378.736C259.762,383.454 262.13,388.909 263.927,393.114C268.58,404 280.787,418.652 277.816,431.259C273.239,450.686 254.246,465.263 246.825,483.571C244.582,489.104 244.371,495.741 243.865,501.582C242.57,516.534 242.271,531.551 241.542,546.535L238.556,547.107C234.796,532.549 231.431,517.885 227.266,503.433C225.304,496.629 220.942,488.815 221.242,481.598C221.871,466.407 235.378,449.541 231.053,434.393C225.515,415 204.619,402.084 200.166,382.202C188.204,382.624 176.235,382.85 164.265,382.85C164.274,401.029 179.403,416.544 181.161,434.496C183.206,455.373 155.971,470.116 155.575,490.699C155.436,497.943 157.969,505.954 159.556,512.9C163.741,531.218 170.204,549.894 171.888,568.675C179.731,568.649 187.572,568.245 195.382,567.529C193.06,549.754 188.298,532.202 184.605,514.681C182.924,506.707 178.895,495.882 180.415,487.58C181.857,479.7 187.211,472.041 191.183,465.283C195.977,457.092 203.304,446.996 203.381,437.146C203.43,431.018 199.65,424.607 196.991,419.341C191.988,409.433 185.835,399.885 182.089,389.389C182.089,389.389 187.017,388.457 187.017,388.457C192.161,403.956 207.024,419.802 207.53,436.42C207.815,445.78 201.546,455.41 197.936,463.741C195.884,470.42 193.218,477.89 193.869,485.007C194.783,495.014 202.639,506.786 206.099,516.196C211.887,531.936 216.403,548.492 223.497,563.713C235.475,561.612 247.355,558.988 259.172,556.129C265.162,532.146 264.17,504.725 274.73,482.052C278.858,473.19 285.365,465.083 290.787,456.998Z" />
              <path d="M373.093,532.266C399.893,528.937 419.239,507.121 434.585,486.551C434.585,486.551 439.402,486.634 439.402,486.634C435.394,492.79 431.213,498.832 427.054,504.887C423.311,512.2 418.646,520.105 417.137,528.3C424.643,528.45 432.144,528.761 439.637,529.223C443.558,510.497 455.656,494.106 461.337,475.909C464.147,466.907 462.864,455.806 463.622,446.394C464.299,438.002 467.496,425.019 462.762,417.37C458.788,410.949 452.39,405.638 446.885,400.627C439.41,401.19 431.921,401.56 424.427,401.717C430.502,406.801 440.115,413.339 442.442,421.481C445.172,431.033 442.497,444.569 442.357,454.428C442.286,459.444 441.109,464.946 438.615,469.334C430.168,484.19 406.876,502.503 389.153,503.936C372.381,505.293 375.983,485.391 376.434,474.636C376.59,470.925 375.838,467.31 376.062,463.562C376.792,451.397 381.89,435.705 378.988,423.708C376.997,415.478 368.025,408.679 362.167,403.304C354.511,403.707 346.858,404.176 339.208,404.689C344.714,410.204 353.021,417.149 354.732,425.237C357.698,439.257 349.568,456.275 348.862,470.435C348.665,474.411 348.711,478.266 348.26,482.25C346.737,495.691 338.64,528.849 359.069,532.398C363.672,533.197 368.486,532.838 373.093,532.266Z" />
              <path d="M526.318,385.626C511.03,388.473 514.328,402.938 512.684,414.487C511.945,419.677 508.308,424.643 506.105,429.32C506.105,429.32 501.919,429.568 501.919,429.568C503.185,426.105 505.269,421.718 505.337,417.934C503.209,409.591 495.329,401.86 490.009,395.508C483.105,396.577 476.187,397.556 469.252,398.403C475.018,404.351 484.049,411.89 485.999,420.436C488.217,430.151 483.827,442.989 482.324,452.571C481.048,460.707 481.571,469.415 479.496,477.327C474.734,495.491 465.347,512.527 461.843,531.012C468.672,531.684 475.491,532.46 482.301,533.306C485.318,511.561 493.831,490.999 495.908,469.102C496.528,462.598 499.494,456.181 502.359,450.407C509.35,436.321 520.283,418.86 537.637,417.193C558.696,415.171 544.811,443.017 540.833,452.483C539.605,455.405 538.357,458.318 537.138,461.244C541.956,461.506 546.776,461.743 551.596,461.949C558.026,448.632 569.352,432.266 569.629,416.931C569.722,411.778 565.731,407.149 562.57,403.448C553.944,393.35 540.48,382.988 526.318,385.626Z" />
              <path d="M576.026,382.278C579.583,390.968 585.723,402.263 585.293,412.01C585.011,418.4 580.849,425.473 578.15,430.993C570.62,446.392 559.474,461.797 555.052,478.5C553.144,485.705 556.409,494.634 557.852,501.661C560.766,515.845 564.357,529.997 566.401,544.343C573.45,545.062 580.51,545.674 587.58,546.154C585.121,531.266 579.692,516.777 575.639,502.281C574.122,496.853 571.133,489.575 571.286,483.803C571.464,477.119 576.36,469.457 579.325,463.849C586.929,449.467 596.972,435.619 608.126,423.782C614.296,417.235 621.523,411.114 630.918,410.98C655.527,410.63 639.373,438.591 633.259,450.243C631.389,453.807 629.469,457.343 627.568,460.889C625.694,464.382 623.821,467.877 622.047,471.423C609.322,496.882 634.31,521.509 636.968,547.071C644.209,546.714 651.435,546.069 658.627,545.156C656.153,519.746 630.212,496.183 642.445,470.63C650.418,453.984 661.79,438.29 673.412,424.003C677.855,418.542 683.852,410.279 691.636,409.739C700.633,409.114 699.641,418.008 697.836,424.274C693.812,438.236 686.47,451.103 680.932,464.479C670.009,490.875 698.351,511.485 701.606,536.829C707.901,535.261 714.169,533.588 720.428,531.88C718.143,517.195 706.875,503.221 700.322,490.215C697.733,485.075 693.989,478.634 693.975,472.621C693.959,466.398 697.469,459.394 699.789,453.859C705.302,440.714 716.39,423.36 715.441,408.519C715.011,401.798 709.906,393.797 706.351,388.292C702.491,382.317 696.64,374.986 688.862,374.653C683.132,374.408 680.469,380.733 679.124,385.296C676.838,393.047 677.377,401.938 674.256,409.386C672.364,413.897 669.106,418.135 666.474,422.222C666.474,422.222 662.481,422.367 662.481,422.367C663.732,419.051 665.095,415.293 664.866,411.676C664.626,407.877 661.589,403.652 659.766,400.436C653.91,390.104 643.931,373.539 630.14,373.572C613.423,373.613 614.836,398.283 610.3,408.882C607.735,414.875 602.907,420.391 599.245,425.725C599.245,425.725 595.43,425.859 595.43,425.859C599.44,419.836 604.876,413.2 605.167,405.636C603.513,396.913 600.301,388.393 597.352,380.055C590.228,380.638 583.119,381.391 576.026,382.278Z" />
              <path d="M772.723,520.333C776.148,519.606 779.555,518.597 782.718,517.08C801.106,508.259 788.904,487.256 782.975,474.01C782.975,474.01 787.678,473.694 787.678,473.694C790.797,479.512 794.362,485.079 797.732,490.751C802.687,497.094 809.548,504.526 811.521,512.6C819.122,511.962 826.749,511.636 834.377,511.625C830.099,492.609 808.352,480.007 800.296,462.578C796.661,454.712 800.01,444.19 801.432,436.133C804.65,417.894 805.897,399.493 809.185,381.328C801.912,381.363 794.638,381.363 787.364,381.317C784.634,401.172 782.379,420.493 778.515,440.225C777.114,447.384 773.08,453.965 771.844,461.011C770.149,470.674 777.604,490.472 762.779,493.232C748.807,495.835 730.58,478.383 727.029,466.317C725.983,462.764 727.012,458.715 727.901,455.258C732.021,439.24 740.2,423.882 742.491,407.432C743.714,398.65 742.606,389.186 742.228,380.386C737.517,380.221 732.808,380.039 728.098,379.849C729.085,389.014 731.366,399.552 729.705,408.767C726.207,428.174 714.192,445.175 710.287,464.492C708.383,473.934 716.101,483.053 721.487,490.041C734.07,506.365 750.07,525.146 772.723,520.333Z" />
            </g>
          </g>
          <g>
            <g>
              <path d="M204.82,262.524C203.713,259.42 200.899,255.44 201.805,251.985C203.66,244.913 219.088,246.485 224.038,246.755C237.623,247.498 251.215,251.797 261.799,260.557C266.404,264.368 271.043,269.246 271.108,275.553C278.714,276.808 286.315,278.09 293.923,279.333C293.892,269.676 285.809,261.434 279.274,255.155C260.869,237.472 239.028,229.663 213.691,229.663C210.15,229.663 206.608,229.756 203.073,229.971C194.241,230.506 184.636,231.441 176.522,235.268C173.4,236.74 169.739,239.15 169.597,242.987C169.36,249.369 176.441,254.829 178.989,260.221C182.412,267.488 182.262,275.266 187.05,282.247C200.421,301.738 227.884,301.758 248.595,306.995C255.491,308.739 277.785,315.586 273.377,327.444C266.812,345.056 237.281,345.052 222.586,343.298C219.668,342.949 216.755,342.465 213.917,341.693C212.097,341.198 210.297,340.584 208.607,339.741C197.723,334.314 204.546,324.685 204.704,315.886C196.19,315.408 187.664,315.14 179.137,315.141C179.14,327.341 161.027,341.956 175.13,352.423C177.269,354.011 179.685,355.205 182.143,356.209C185.899,357.743 189.824,358.847 193.769,359.771C199.461,361.104 205.243,362.046 211.04,362.787C235.422,365.902 257.899,362.541 278.775,349.225C285.773,344.762 294.917,338.61 297.748,330.35C301.484,319.415 289.126,305.037 281.112,299.219C267.432,289.288 250.549,286.165 234.49,282.149C221.514,278.904 209.519,275.762 204.82,262.524Z" />
              <path d="M309.828,336.913C303.936,346.957 292.343,362.208 305.349,371.804C307.592,373.459 310.149,374.666 312.77,375.587C316.141,376.772 319.68,377.49 323.237,377.81C348.479,380.078 377.589,359.797 393.936,341.903C393.936,341.903 396.669,344.825 396.669,344.825C389.154,351.375 381.012,358.943 375.317,367.143C373.26,370.105 370.657,377.85 376.864,377.589L379.708,377.293L379.673,377.461C388.002,377.048 396.317,376.357 404.605,375.434C406.424,366.745 414.555,359.051 420.01,352.521C415.214,353.175 410.406,353.747 405.589,354.221C415.353,342.297 420.645,333.852 417.459,318.34C415.328,307.974 411.987,294.41 406.24,285.308C397.651,271.703 380.007,265.419 364.689,265.045C346.824,264.608 328.989,263.372 311.193,261.775C315.029,268.86 318.343,275.657 318.673,283.796C333.445,285.88 348.285,287.54 363.186,288.346C382.351,289.381 391.559,298.115 394.3,317.224C394.967,321.873 395.837,326.635 395.639,331.351C380.817,321.44 365.18,310.916 346.901,309.323C343.526,309.029 340.112,309.035 336.752,309.491C319.304,311.859 317.287,324.089 309.89,336.806L309.828,336.913ZM332.802,339.816C338.463,330.178 344.992,324.385 356.926,325.156C367.204,325.819 382.819,331.421 389.958,338.988C388.418,342.639 381.529,346.438 378.377,348.559C367.688,355.751 354.009,363.266 340.586,362.351C326.062,361.36 326.705,350.114 332.737,339.926L332.802,339.816Z" />
              <path d="M484.703,239.329C467.962,244.168 451.024,267.769 453.655,285.261C453.655,285.261 449.922,286.421 449.922,286.421C449.038,282.32 449.012,278.823 449.655,274.715C449.251,267.476 449.334,260.2 449.342,252.953C443.18,254.811 436.987,256.571 430.742,258.13C432.564,269.995 432.685,283.009 436.8,294.322C440.508,304.517 449.019,317.021 447.27,328.36C444.429,346.789 420.878,355.906 416.893,373.908C423.443,373.015 429.977,372.006 436.501,370.938C439.673,358.184 453.755,347.688 461.588,337.78C465.937,332.279 470.739,326.206 469.079,318.754C465.677,303.525 453.899,275.226 475.671,267.918C488.788,263.515 503.331,280.825 511.633,288.444C514.388,290.972 517.089,293.567 519.613,296.328C526.13,294.908 532.681,293.64 539.268,292.589C528.59,281.896 515.299,273.835 505.264,262.502C499.149,255.596 503.516,238.903 490.838,238.451C488.765,238.377 486.688,238.756 484.703,239.329Z" />
              <path d="M550.841,269.41C549.478,268.242 548.154,267.016 546.961,265.672C535.876,253.177 561.971,252.633 568.738,252.7C587.46,252.886 601.66,262.09 615.139,274.358C622.673,274.325 630.208,274.285 637.743,274.241C632.51,267.996 626.478,262.317 621.425,255.941C610.041,241.576 600.648,229.165 580.194,228.501C575.185,228.338 570.167,228.729 565.237,229.627C551.867,232.064 539.19,238.031 529.069,247.135C526.422,249.516 521.507,253.46 521.212,257.323C520.848,262.076 525.59,266.462 528.717,269.361C545.704,285.1 568.455,296.111 591.289,299.607C603.649,301.499 616.897,299.925 628.989,303.184C636.323,305.161 635.167,310.653 631.642,315.879C620.294,332.695 601.339,338.915 581.822,339.651C579.57,339.735 577.293,339.662 575.07,339.265C559.345,336.455 570.547,320.543 575.783,312.853C568.372,313.129 560.974,313.699 553.603,314.511C545.916,325.077 519.149,351.502 544.193,358.544C547.175,359.383 550.26,359.847 553.34,360.138C557.855,360.565 562.403,360.6 566.932,360.418C600.483,359.065 633.542,345.244 650.144,314.559C652.069,311 654.489,306.305 653.536,302.102C651.679,293.912 634.947,290.686 628.818,289.459C602.327,284.159 572.803,288.213 550.841,269.41Z" />
              <path d="M663.701,309.651C658.796,322.154 651.061,340.957 668.415,347.351C671.517,348.494 674.809,349.086 678.09,349.403C682.393,349.819 686.746,349.747 691.047,349.337C718.442,346.726 734.431,330.823 737.082,304.024C737.082,304.024 742.154,307.226 742.154,307.226C740.657,314.677 741.823,324.435 743.434,331.774C744.514,336.693 748.006,342.987 753.842,342.673L757.12,342.329L757.151,342.501C766.953,342.013 776.765,341.695 786.578,341.677C785.569,333.452 781.595,325.545 778.404,318.007C773.212,318.005 768.021,318.072 762.831,318.2C758.497,306.295 753.418,295.718 759.412,283.649C762.687,277.058 767.682,269.455 765.282,261.77C763.46,255.935 756.307,253.363 751.175,251.141C737.052,245.028 721.418,240.51 706.001,239.591C687.921,238.514 669.863,237.101 651.802,235.743C653.582,243.388 654.002,250.969 655.314,258.613C673.964,259.022 692.614,259.44 711.265,259.81C726.642,260.115 743.748,263.105 737.802,282.027C736.638,285.73 735.748,289.499 734.828,293.266C722.467,283.408 708.188,277.93 692.204,278.235C688.794,278.3 685.365,278.619 682.039,279.397C666.601,283.006 668.475,297.409 663.75,309.525L663.701,309.651ZM683.746,308.271C685.961,298.166 691.395,291.046 702.416,290.394C712.534,289.795 723.629,295.129 731.559,300.972C731.984,303.43 729.55,308.095 728.58,310.347C723.839,321.347 714.403,329.427 702.286,330.485C687.656,331.763 680.665,322.223 683.718,308.399L683.746,308.271Z" />
            </g>
          </g>
        </g>
      </svg>
    </>
  )
}

const loopListener = function () {
  const random = gsap.utils.random(1, 20, 2)
  gsap.delayedCall(random, () => {
    this.reversed() ? this.restart() : this.reverse()
  })
}

export const ZigZag = () => {
  const ref = useRef()
  const am = useContext(AnimCtx)
  
  useGSAP(() => {
    const tl = gsap.timeline({
      onReverseComplete: loopListener,
      onComplete: loopListener,
      delay: 0.5,
      paused: true
    })
    .set(ref.current, {
      strokeDasharray: (i, path) => path.getTotalLength(),
      strokeDashoffset: (i, path) => path.getTotalLength()
    })
    .to(ref.current, {
      strokeDashoffset: (i, path) => -path.getTotalLength(),
      duration: 1
    })

    am.bind('particle', tl)
  }, { dependencies: [am.current], revertOnUpdate: true })

  return (
    <svg className={s.svg} width={100} viewBox="0 0 285 45" version="1.1">
      <path style={{
        fill: 'none',
        stroke: '#c3c3c3',
        strokeWidth: 10,
        strokeOpacity: 0.8,
        strokeLinecap: 'round',
        strokeDasharray: 2000,
        strokeDashoffset: 2000
      }} ref={ref} d="M2.5,42.5C2.5,42.5 19.669,25.331 31.511,13.489C34.425,10.575 38.378,8.937 42.5,8.937C46.622,8.937 50.575,10.575 53.489,13.489C59.098,19.098 65.902,25.902 71.511,31.511C74.425,34.425 78.378,36.063 82.5,36.063C86.622,36.063 90.575,34.425 93.489,31.511C99.098,25.902 105.902,19.098 111.511,13.489C114.425,10.575 118.378,8.937 122.5,8.937C126.622,8.937 130.575,10.575 133.489,13.489C139.098,19.098 145.902,25.902 151.511,31.511C154.425,34.425 158.378,36.063 162.5,36.063C166.622,36.063 170.575,34.425 173.489,31.511C179.098,25.902 185.902,19.098 191.511,13.489C194.425,10.575 198.378,8.937 202.5,8.937C206.622,8.937 210.575,10.575 213.489,13.489C219.098,19.098 225.902,25.902 231.511,31.511C234.425,34.425 238.378,36.063 242.5,36.063C246.622,36.063 250.575,34.425 253.489,31.511C265.331,19.669 282.5,2.5 282.5,2.5" />
    </svg>
  )
}

export const Cross = () => {
  const am = useContext(AnimCtx)
  const ref = useRef()

  useGSAP(() => {
    const el = ref.current
    const tl = gsap.timeline({
      onReverseComplete: loopListener,
      onComplete: loopListener,
      delay: 6,
      paused: true,
      defaults: {
        duration: 0.7,
        ease: 'power1.inOut'
      }
    })
    .set(ref.current, {
      scale: 0,
      rotate: -180,
      opacity: 1,
      transformOrigin: '50% 50%'
    })
    .to(el, { scale: 0.9, rotate: '+=180' })
    .to(el, { x: 100, rotate: '+=180' })
    .to(el, { scale: 0, rotate: '+=180' })

    am.bind('particle', tl)
  }, { dependencies: [am.current], revertOnUpdate: true })

  /** @type {import('react').CSSProperties} */
  const style = {
    fill: 'none',
    stroke: '#c3c3c3',
    strokeWidth: 24,
    transform: 'scale(0.85)',
    transformOrigin: 'center',
    strokeLinecap: 'round'
  }

  return (
    <svg ref={ref} className={`${s.svg} ${s.cross}`} width={20} style={{ opacity: 0 }} viewBox="0 0 109 109" version="1.1">
      <g>
        <path style={style} d="M4.096,4.096L104.096,104.096" />
        <path style={style} d="M104.096,4.096L4.096,104.096" />
      </g>
    </svg>
  )
}

export const FadeIn = ({ children }) => {
  const am = useContext(AnimCtx)

  const ref = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })
    .set(ref.current, { y: 20 })
    .to(ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      onComplete: () => am.setCurrent('particle'),
      onStart() {
        [document.documentElement, document.body].forEach((x) => x.classList.add(s.noScrollbar))
        document.body.style.height = '400vh'
      }
    })

    am.bind('about', tl)
  }, [am.current])

  return (
    <div style={{ opacity: 0 }} ref={ref}>
      {children}
    </div>
  )
}

const dm_mono = DM_Mono({ subsets: ['latin'], display: 'block', weight: '400' })
const inter = Inter({ subsets: ['latin'], display: 'block' })

export const About = () => {
  const am = useContext(AnimCtx)
  const ref = useRef()

  useGSAP(() => {
    const el = ref.current

    const arrowTl = gsap.timeline({ repeat: -1, yoyo: true })
    .set(`.${s.scrollHint} span`, { y: -2 })
    .to(`.${s.scrollHint} span`, { y: 2, duration: 2, ease: 'power1.inOut' })

    gsap.timeline({
      scrollTrigger: {
        start: 500,
        end: 501,
        toggleActions: 'play none none reverse',
        onEnter() {
          gsap.to(`.${s.scrollHint}`, { opacity: 0, display: 'none' })
          arrowTl.pause()
        }
      },
      defaults: {
        ease: 'power1.inOut',
        duration: 0.4
      }
    })
    .to(el, { x: 60, opacity: 0, display: 'none' })
    .to({}, { duration: 1.5 })
    
    const hintEnterTl = gsap.timeline({ paused: true })
    .fromTo(`.${s.scrollHint}`, { y: -10, opacity: 0 }, { y: 0, opacity: 1, delay: 2 })

    am.bind('particle', hintEnterTl)
  }, { scope: ref, dependencies: [am.current] })

  return (
    <div ref={ref} className={dm_mono.className}>
      <Cross />
      <FadeIn>
        <p style={{ marginTop: 30 }}>
          Hello, I am Sarsa Murmu, a 20 years old student who does programming sometimes.
          If you've come here then you most probably know who I am and what I do.
          Check out my GitHub and social networking sites for more.
        </p>
      </FadeIn>
      <ZigZag />
      <br />
      <div className={s.scrollHint} style={{ opacity: 0 }} onClick={() => window.scrollTo({ top: 610 })}>
        <span className={inter.className}>{'->'}</span>
        Keep scrolling
      </div>
    </div>
  )
}

export const Connect = () => {
  const ref = useRef()

  useGSAP(() => {
    const letter = `.${s.rollPart}`
    
    const enterTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'circ.inOut'
      }
    })
    .set(letter, { y: 35 })
    .set(ref.current, { display: 'block', opacity: 1 })
    .set('ul li', { x: -15, opacity: 0, scale: 0.9, transformOrigin: '0 50%' })
    .to(letter, { y: 0, stagger: 0.05, duration: 0.5 })
    .to('ul li', { x: 0, opacity: 1, scale: 1, stagger: 0.1 })

    const leaveTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'circ.inOut'
      },
    })
    .to(letter, { y: -35, stagger: 0.05, duration: 0.3 })
    .to('ul li', { x: 15, opacity: 0, stagger: 0.1, duration: 0.4 })
    .set(ref.current, { display: 'none', opacity: 0 })

    /**
     * @param tl1 {gsap.core.Timeline}
     * @param tl2 {gsap.core.Timeline}
    */
    const createCallback = (tl1, tl2) => {
      return () => {
        const play = () => {
          tl1.timeScale(1).play(0)
          tl2.eventCallback('onComplete', null)
        }
        if (tl2.isActive()) {
          tl2.timeScale(4).eventCallback('onComplete', play)
        } else {
          play()
        }
      }
    }

    const enterCallback = createCallback(enterTl, leaveTl)
    const leaveCallback = createCallback(leaveTl, enterTl)
    ScrollTrigger.create({
      start: 501,
      end: 1300,
      onEnter: enterCallback,
      onEnterBack: enterCallback,
      onLeave: leaveCallback,
      onLeaveBack: leaveCallback
    })
  }, { scope: ref })

  const onMouseEnter = useCallback((e) => {
    gsap.context(() => {
      const target = `.${s.bg}`
      gsap.fromTo(target, {
        scaleX: 0,
        transformOrigin: '0 0'
      }, {
        scaleX: 1,
        transformOrigin: '0 0'
      })
    }, e.currentTarget)
  })

  const onMouseLeave = useCallback((e) => {
    gsap.context(() => {
      const target = `.${s.bg}`
      gsap
        .fromTo(target, {
          scaleX: 1,
          transformOrigin: '0 0'
        }, {
          scaleX: 0,
          transformOrigin: '100% 0'
        })
    }, e.currentTarget)
  })

  return (
    <div ref={ref} style={{ display: 'none' }} className={dm_mono.className}>
      <div style={{
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        height: 35
      }}>
        {[...'Connect with me'].map((x, i) => (
          <span className={s.rollPart} key={x+i}>{x}</span>
        ))}
      </div>
      <ul className={s.connectList}>
        {[
          ['GitHub', 'https://github.com/sarsamurmu'],
          ['X {Twitter}', 'https://x.com/sarsamurmu'],
          ['Telegram', 'https://telegram.me/sarsamurmu'],
          ['Discord', 'https://discordapp.com/users/520857452087083038']
        ].map(([name, link]) => (
          <li key={name}>
            <a href={link} target='_blank' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <span>{name}</span>
              <span className={s.bg} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const GoodBye = () => {
  const ref = useRef()
  useGSAP(() => {
    const el = ref.current

    const handTl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 5 })
    .set('span', { transformOrigin: '100% 100%', display: 'inline-block' })
    .to('span', {
      rotate: 10,
      ease: 'power1.inOut',
      duration: 0.5,
      repeat: 4,
      yoyo: true
    })

    gsap.timeline({
      scrollTrigger: {
        start: 1300-2,
        end: 3000,
        toggleActions: 'play none none reverse',
        onEnter: () => handTl.play(),
        onEnterBack: () => handTl.play(),
        onLeave: () => handTl.pause(),
        onLeaveBack: () => handTl.pause()
      },
      defaults: {
        ease: 'power1.inOut',
        duration: 0.4
      }
    })
    .fromTo(el, { y: 60 }, { y: 0, opacity: 1, display: 'block', delay: 1.6 })
  }, { scope: ref })

  return (
    <div className={s.goodBye} ref={ref} style={{ opacity: 0, display: 'none' }}>
      <p className={dm_mono.className}>
        That's all for now.<br />
        See you later
        <span style={{ paddingLeft: 6 }}>👋</span>
      </p>
    </div>
  )
}

export const Leaves = () => {
  const ref = useRef()
  const am = useContext(AnimCtx)

  useGSAP(() => {
    gsap.set('img', { scale: 0, opacity: 0, transformOrigin: 'right bottom' })
    gsap.set(ref.current, { display: 'block' })
    
    const l1 = `.${s.leaf}`
    const tl = gsap.timeline({ paused: true })
    .to({}, {}, 4)
    .to(l1, { scale: 1, opacity: 1, stagger: 1, duration: 2 })
    .to({}, {}, 5)
    .to(l1, {
      rotate: '+=15',
      repeat: -1,
      yoyo: true,
      duration: 15,
      ease: 'power1.inOut',
      delay: (i) => {
        if (i === 1) return 3
      }
    })

    const l2 = `.${s.leaf2}`
    const tl2 = gsap.timeline({ paused: true })
    .set(l2, { scale: 1 })
    .to({}, {}, 20)
    .to(l2, { opacity: 1 })

    am.bind('particle', tl)
    am.bind('particle', tl2)
  }, { scope: ref, dependencies: [am.current] })

  const base = {
    src: leaf_svg,
    className: s.leaf,
    'aria-hidden': true,
    alt: ''
  }

  return (
    <div ref={ref} style={{ display: 'none' }}>
      <Image {...base} style={{ transform: 'rotate(-15deg)', transformOrigin: 'right bottom' }} />
      <Image {...base} style={{ filter: 'hue-rotate(70deg)', transform: 'rotate(0deg)', transformOrigin: 'right bottom' }} />
      <Image {...base} className={s.leaf2} src={leaf2_svg} />
    </div>
  )
}
