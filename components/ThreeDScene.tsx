'use client'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import SplineLoader from '@splinetool/loader'

const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // camera
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -100000,
      100000
    )

    camera.position.set(-3662.89, 2379.99, 3678.25)
    camera.quaternion.setFromEuler(new THREE.Euler(-0.54, -0.71, -0.37))

    // scene
    const scene = new THREE.Scene()

    // spline scene
    const loader = new SplineLoader()

    loader.load(
      'https://prod.spline.design/mWUMxp9OcuZ1o8cC/scene.splinecode',
      splineScene => {
        scene.add(splineScene)
        // Update materials to be compatible with current Three.js version
        splineScene.traverse(object => {
          if (
            'material' in object &&
            object.material instanceof THREE.Material
          ) {
            object.material = new THREE.MeshBasicMaterial({
              color: (object.material as THREE.MeshBasicMaterial).color
            })
          }
        })
      }
    )

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // scene settings
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    scene.background = new THREE.Color('#e698a8')
    renderer.setClearAlpha(1)

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.enableDamping = true
    controls.dampingFactor = 0.125

    const onWindowResize = () => {
      camera.left = window.innerWidth / -2
      camera.right = window.innerWidth / 2
      camera.top = window.innerHeight / 2
      camera.bottom = window.innerHeight / -2
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

export default ThreeDScene
