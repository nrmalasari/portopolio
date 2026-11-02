/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  ASET (taruh di /public/assets/lanyard/)                            */
/* ------------------------------------------------------------------ */
const CARD_GLB = "/assets/lanyard/nirma-card.glb";
const STRAP_PNG = "/assets/lanyard/nirma-strap.png";

/* ------------------------------------------------------------------ */
/*  KAMERA TETAP — semua ukuran dihitung dari sini                     */
/* ------------------------------------------------------------------ */
const CAM_Z = 20;
const FOV = 20;
const VIS_H = 2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2)); // tinggi dunia yang terlihat (~7.06)

/* Ukuran kartu saat r = 1 (r = faktor skala) */
const CARD_W = 1.61;
const CARD_H = 2.25;

interface LanyardProps {
  className?: string;
  gravity?: [number, number, number];
  /** geser titik gantung ke kiri/kanan (satuan dunia) */
  offsetX?: number;
  transparent?: boolean;
}

interface Layout {
  portrait: boolean;
  r: number; // skala kartu
  rope: number; // panjang tiap segmen tali
  anchorY: number; // titik gantung (di atas layar)
  strapWidth: number;
  repeatX: number;
  resW: number;
  resH: number;
}

/* ------------------------------------------------------------------ */
/*  Hitung ukuran kartu & tali dari ukuran container                   */
/*  -> otomatis pas di HP (portrait) maupun desktop (landscape)        */
/* ------------------------------------------------------------------ */
function computeLayout(w: number, h: number): Layout {
  const aspect = w / h;
  const portrait = aspect < 1;
  const visW = VIS_H * aspect;

  // lebar kartu maks 60% (HP) / 50% (desktop) dari container,
  // tinggi kartu maks 40% (HP) / 34% (desktop)
  const rW = (visW * (portrait ? 0.6 : 0.5)) / CARD_W;
  const rH = (VIS_H * (portrait ? 0.4 : 0.34)) / CARD_H;
  const r = Math.round(THREE.MathUtils.clamp(Math.min(rW, rH), 0.55, 1.3) * 20) / 20;

  const anchorY = VIS_H / 2 + 0.5; // sedikit di atas tepi atas container
  const centerY = VIS_H * (portrait ? -0.04 : -0.08); // posisi tengah kartu saat menggantung
  const rope =
    Math.round(Math.max(0.35, (anchorY - 1.45 * r - centerY) / 3) * 20) / 20;

  const strapWidth = r; // lineWidth proporsional dengan kartu
  const strapWorldW = strapWidth * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const chain = 3 * rope + 1.45 * r + 1;
  const repeatX = Math.max(2, chain / (strapWorldW * (1024 / 249)));

  return {
    portrait,
    r,
    rope,
    anchorY,
    strapWidth,
    repeatX,
    resW: Math.max(1, Math.round(w)),
    resH: Math.max(1, Math.round(h)),
  };
}

/* ------------------------------------------------------------------ */
/*  KOMPONEN UTAMA                                                     */
/* ------------------------------------------------------------------ */
export default function Lanyard({
  className = "",
  gravity = [0, -30, 0],
  offsetX = 0,
  transparent = true,
}: LanyardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [inView, setInView] = useState(true);

  // ukur container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setSize((prev) =>
          prev &&
          Math.abs(prev.w - rect.width) < 2 &&
          Math.abs(prev.h - rect.height) < 80 // abaikan perubahan kecil (address-bar HP)
            ? prev
            : { w: rect.width, h: rect.height }
        );
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // hemat baterai: berhenti render saat lanyard keluar layar
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const layout = useMemo(
    () => (size ? computeLayout(size.w, size.h) : null),
    [size]
  );

  return (
    <div
      ref={wrapRef}
      className={`relative z-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    >
      {layout && (
        <Canvas
          camera={{ position: [0, 0, CAM_Z], fov: FOV }}
          gl={{ alpha: transparent, antialias: true }}
          dpr={[1, 2]}
          frameloop={inView ? "always" : "never"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            // HP: scroll halaman tetap jalan saat jari geser vertikal di atas lanyard
            touchAction: layout.portrait ? "pan-y" : "none",
          }}
          onCreated={({ gl }) =>
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
          }
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            gravity={gravity}
            timeStep={1 / 60}
            key={`${layout.portrait}-${layout.r}-${layout.rope}`}
          >
            <Band layout={layout} offsetX={offsetX} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BAND = tali + kartu + fisika                                       */
/* ------------------------------------------------------------------ */
interface BandProps {
  layout: Layout;
  offsetX: number;
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ layout, offsetX, maxSpeed = 50, minSpeed = 0 }: BandProps) {
  const { r, rope, anchorY, portrait } = layout;

  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const cardScale = CARD_H * r; // 2.25 * r
  const jointY = 1.45 * r;

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: portrait ? 5 : 4,
    linearDamping: portrait ? 5 : 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const texture = useTexture(STRAP_PNG);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  curve.curveType = "chordal";

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  // geometri & material tali dibuat SEKALI (tidak dibuat ulang tiap render)
  const strapGeometry = useMemo(() => new MeshLineGeometry(), []);
  const strapMaterial = useMemo(
    () =>
      new MeshLineMaterial({
        color: "white",
        depthTest: false,
        resolution: new THREE.Vector2(layout.resW, layout.resH),
        map: texture,
        useMap: true,
        repeat: new THREE.Vector2(-layout.repeatX, 1),
        lineWidth: layout.strapWidth,
      }),
    [texture, layout.resW, layout.resH, layout.repeatX, layout.strapWidth]
  );

  const stopDrag = (e: any) => {
    e?.target?.releasePointerCapture?.(e.pointerId);
    drag(false);
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], rope]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], rope]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], rope]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, jointY, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation()
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      // ujung tali menempel tepat di klip kartu
      if (card.current) {
        const q = card.current.rotation();
        const clipLocal = new THREE.Vector3(0, jointY, 0).applyQuaternion(
          new THREE.Quaternion(q.x, q.y, q.z, q.w)
        );
        curve.points[0].copy(card.current.translation()).add(clipLocal);
      }

      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * (portrait ? 0.12 : 0.25),
        z: ang.z,
      });
    }
  });

  return (
    <>
      <group position={[offsetX, anchorY, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={"fixed" as RigidBodyProps["type"]}
        />
        <RigidBody
          position={[rope, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[rope * 2, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[rope * 3, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[rope * 4, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8 * r, 1.125 * r, 0.01]} />
          <group
            scale={cardScale}
            position={[0, -1.2 * r, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onLostPointerCapture={() => drag(false)}
            onPointerDown={(e: any) => {
              e.stopPropagation();
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            {/* KARTU — tekstur desain baru ada di dalam nirma-card.glb */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.12}
                roughness={0.55}
                metalness={0.25}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      {/* TALI */}
      <mesh ref={band}>
        <primitive object={strapGeometry} attach="geometry" />
        <primitive object={strapMaterial} attach="material" />
      </mesh>
    </>
  );
}
