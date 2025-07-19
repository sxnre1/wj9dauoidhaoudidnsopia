function showSection(sectionId, el) {
  // 모든 nav-link에서 active 제거
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => link.classList.remove("active"));
  // 클릭한 엘리먼트에 active 추가
  el.classList.add("active");

  // 섹션 표시 로직 (현재 예시 없음)
  console.log(`Show section: ${sectionId}`);
}
