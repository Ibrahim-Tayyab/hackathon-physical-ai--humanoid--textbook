# MODULE 5 (VLA & CAPSTONE) - FILE RELOCATION INSTRUCTIONS

## CRITICAL: Files Created in WRONG Location

All 4 Module 5 files were created in the ROOT directory instead of the proper nested location.

**Current Location (WRONG):**
```
E:\Hackathon_AI\hackathon-youtube\
├── MODULE5-01-voice-to-action.mdx
├── MODULE5-02-cognitive-planning.mdx
├── MODULE5-03-vla-models.mdx
└── MODULE5-04-capstone-project.mdx
```

**Target Location (CORRECT):**
```
E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\05-Module-4-VLA\
├── 01-voice-to-action.mdx
├── 02-cognitive-planning.mdx
├── 03-vla-models.mdx
└── 04-capstone-project.mdx
```

---

## STEP-BY-STEP RELOCATION PROCESS

### Step 1: Create Target Directory

**Option A: Run Batch File (Easiest)**
```cmd
cd E:\Hackathon_AI\hackathon-youtube
CREATE_MODULE5_DIR.bat
```

**Option B: Manual Command**
```cmd
mkdir "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\05-Module-4-VLA"
```

---

### Step 2: Move Files and Rename

```cmd
REM Navigate to root directory
cd E:\Hackathon_AI\hackathon-youtube

REM Move and rename all 4 files
move "MODULE5-01-voice-to-action.mdx" "physical-ai-textbook\docs\05-Module-4-VLA\01-voice-to-action.mdx"
move "MODULE5-02-cognitive-planning.mdx" "physical-ai-textbook\docs\05-Module-4-VLA\02-cognitive-planning.mdx"
move "MODULE5-03-vla-models.mdx" "physical-ai-textbook\docs\05-Module-4-VLA\03-vla-models.mdx"
move "MODULE5-04-capstone-project.mdx" "physical-ai-textbook\docs\05-Module-4-VLA\04-capstone-project.mdx"
```

---

### Step 3: Verify Files Moved

```cmd
dir "physical-ai-textbook\docs\05-Module-4-VLA"
```

**Expected Output:**
```
01-voice-to-action.mdx
02-cognitive-planning.mdx
03-vla-models.mdx
04-capstone-project.mdx
```

---

### Step 4: Test in Docusaurus

```cmd
cd physical-ai-textbook
npm start
```

**Expected Result:**
- Browser opens to http://localhost:3000
- Sidebar shows "Module 4: VLA & Capstone"
- 4 chapters visible and clickable
- All Mermaid diagrams render correctly

---

## VERIFICATION CHECKLIST

- [ ] Directory `05-Module-4-VLA` exists in `docs/`
- [ ] All 4 files moved successfully
- [ ] No `MODULE5-*.mdx` files remain in root
- [ ] Docusaurus builds without errors
- [ ] All chapters visible in sidebar
- [ ] Mermaid diagrams render (3 diagrams total)
- [ ] Navigation between chapters works
- [ ] Code blocks syntax-highlighted correctly

---

## FILE CONTENT SUMMARY

### File 1: 01-voice-to-action.mdx (21,317 chars)
- **Mermaid Diagram**: Voice-to-Action pipeline sequence (User → ReSpeaker → Whisper → LLM → ROS 2)
- **Content**: ReSpeaker setup, Whisper installation, complete ROS 2 node (250+ lines Python)
- **Key Features**: Voice Activity Detection, wake word detection, multi-language support

### File 2: 02-cognitive-planning.mdx (17,433 chars)
- **Content**: LLM task planning (GPT-4 vs Llama 3.1), cloud vs edge inference
- **Complete Code**: LLM planner node with safety validator (200+ lines)
- **Key Topics**: Skill library, location database, error recovery, safety checks

### File 3: 03-vla-models.mdx (15,738 chars)
- **Mermaid Diagram**: VLA architecture (Vision encoder → Language encoder → Fusion → Action decoder)
- **Content**: RT-2, OpenVLA, fine-tuning with LoRA, deployment on Jetson
- **Complete Code**: OpenVLA inference node (100+ lines)
- **Comparison Table**: RT-1 vs RT-2 vs OpenVLA vs π0 vs Octo

### File 4: 04-capstone-project.mdx (17,216 chars)
- **Mermaid Diagram**: Grand architecture (Perception → Processing → Control → Hardware layers)
- **Content**: 10-week project plan, grading rubric (100 points), 3 complex tasks
- **Deliverables**: Code repo, video demo, technical report guidelines
- **Success Stories**: 3 example capstone projects with scores

**Total Module 5 Content:**
- **Word Count**: ~16,500 words
- **Characters**: 71,704
- **Mermaid Diagrams**: 3 (voice pipeline, VLA architecture, grand system architecture)
- **Code Examples**: 600+ lines (Python ROS 2 nodes, inference scripts)

---

## DOCUSAURUS SIDEBAR CONFIGURATION

After moving files, verify `sidebars.ts` includes:

```typescript
{
  type: 'category',
  label: 'Module 4: VLA & Capstone',
  items: [
    '05-Module-4-VLA/01-voice-to-action',
    '05-Module-4-VLA/02-cognitive-planning',
    '05-Module-4-VLA/03-vla-models',
    '05-Module-4-VLA/04-capstone-project',
  ],
}
```

If NOT present, add manually to `physical-ai-textbook/sidebars.ts`.

---

## TROUBLESHOOTING

### Issue 1: "Module Not Found" Error
**Cause**: Files not in correct directory  
**Fix**: Re-run Step 2 commands

### Issue 2: Mermaid Diagrams Not Rendering
**Cause**: Missing plugin  
**Fix**: Verify `@docusaurus/theme-mermaid` installed
```bash
cd physical-ai-textbook
npm install
```

### Issue 3: Sidebar Not Updating
**Cause**: Cached build  
**Fix**: Clear cache and rebuild
```bash
cd physical-ai-textbook
npm run clear
npm start
```

---

## FINAL VALIDATION COMMAND

```bash
cd E:\Hackathon_AI\hackathon-youtube

echo "Checking file locations..."
if exist "physical-ai-textbook\docs\05-Module-4-VLA\01-voice-to-action.mdx" (
    echo [✓] File 1 found
) else (
    echo [✗] File 1 missing
)

if exist "physical-ai-textbook\docs\05-Module-4-VLA\02-cognitive-planning.mdx" (
    echo [✓] File 2 found
) else (
    echo [✗] File 2 missing
)

if exist "physical-ai-textbook\docs\05-Module-4-VLA\03-vla-models.mdx" (
    echo [✓] File 3 found
) else (
    echo [✗] File 3 missing
)

if exist "physical-ai-textbook\docs\05-Module-4-VLA\04-capstone-project.mdx" (
    echo [✓] File 4 found
) else (
    echo [✗] File 4 missing
)

echo.
echo All checks complete!
```

---

## CONTACT FOR HELP

If relocation fails:
1. Check Windows file permissions (Run as Administrator)
2. Verify paths use backslashes `\` (not forward slashes `/`)
3. Ensure Docusaurus is not running during file move
4. Manually copy-paste files using File Explorer if commands fail

---

**After successful relocation, you will have a COMPLETE Physical AI textbook with 5 modules and 16 chapters!**
